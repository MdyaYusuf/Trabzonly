using System.Text.Json;
using Api.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Api.Features.Quizzes.Seed;

/// <summary>
/// Idempotent startup seed: inserts the 20 thematic quiz packs from
/// <c>trabzonly-quiz.json</c> at the repository root (gitignored) when their
/// <see cref="Quiz.SeedKey"/> is missing. Always runs on API startup; never
/// updates or deletes existing seeded rows. Admin CRUD can still change content later.
/// </summary>
public static class QuizSeeder
{
  private static readonly string[] OptionOrder = ["A", "B", "C", "D"];

  private static readonly JsonSerializerOptions JsonOptions = new()
  {
    PropertyNameCaseInsensitive = true
  };

  public static async Task SeedAsync(IServiceProvider services, CancellationToken cancellationToken = default)
  {
    await using AsyncServiceScope scope = services.CreateAsyncScope();
    IServiceProvider sp = scope.ServiceProvider;
    ILogger logger = sp.GetRequiredService<ILoggerFactory>().CreateLogger("QuizSeeder");
    IQuizRepository quizRepository = sp.GetRequiredService<IQuizRepository>();
    IUnitOfWork unitOfWork = sp.GetRequiredService<IUnitOfWork>();

    List<string> existingKeys = await quizRepository.Query(enableTracking: false)
      .Where(q => q.SeedKey != null)
      .Select(q => q.SeedKey!)
      .ToListAsync(cancellationToken);

    HashSet<string> existingKeySet = existingKeys.ToHashSet(StringComparer.Ordinal);
    List<QuizSeedPack> missingPacks = QuizSeedManifest.Packs
      .Where(pack => !existingKeySet.Contains(pack.SeedKey))
      .ToList();

    if (missingPacks.Count == 0)
    {
      logger.LogInformation(
        "Quiz seed skipped: all {PackCount} packs already present.",
        QuizSeedManifest.Packs.Count);
      return;
    }

    string? bankPath = ResolveQuizBankPath();

    if (bankPath == null)
    {
      logger.LogWarning(
        "Quiz seed: {MissingCount} pack(s) missing but trabzonly-quiz.json was not found. Place the file at the repository root.",
        missingPacks.Count);
      return;
    }

    string json = await File.ReadAllTextAsync(bankPath, cancellationToken);
    List<QuizBankQuestionJson>? bankQuestions = JsonSerializer.Deserialize<List<QuizBankQuestionJson>>(json, JsonOptions);

    if (bankQuestions == null || bankQuestions.Count == 0)
    {
      logger.LogWarning("Quiz seed: trabzonly-quiz.json at {Path} could not be parsed or is empty.", bankPath);
      return;
    }

    Dictionary<int, QuizBankQuestionJson> byNumber = bankQuestions
      .GroupBy(q => q.SoruNo)
      .ToDictionary(g => g.Key, g => g.First());

    int inserted = 0;

    foreach (QuizSeedPack pack in missingPacks)
    {
      Quiz quiz = BuildQuiz(pack, byNumber, logger);

      if (quiz.Questions.Count != pack.QuestionNumbers.Count)
      {
        logger.LogWarning(
          "Quiz seed skipped pack {SeedKey}: expected {Expected} questions, built {Actual}.",
          pack.SeedKey,
          pack.QuestionNumbers.Count,
          quiz.Questions.Count);
        continue;
      }

      await quizRepository.AddAsync(quiz, cancellationToken);
      inserted++;
    }

    if (inserted > 0)
    {
      await unitOfWork.SaveChangesAsync(cancellationToken);
    }

    logger.LogInformation(
      "Quiz seed finished: inserted {InsertedCount} pack(s) from {Path}.",
      inserted,
      bankPath);
  }

  private static Quiz BuildQuiz(
    QuizSeedPack pack,
    Dictionary<int, QuizBankQuestionJson> byNumber,
    ILogger logger)
  {
    var quiz = new Quiz
    {
      Title = pack.Title,
      Description = pack.Description,
      Category = pack.Category,
      SeedKey = pack.SeedKey,
      IsActive = true
    };

    int sortOrder = 0;

    foreach (int questionNumber in pack.QuestionNumbers)
    {
      if (!byNumber.TryGetValue(questionNumber, out QuizBankQuestionJson? bankQuestion))
      {
        logger.LogWarning(
          "Quiz seed pack {SeedKey}: question number {QuestionNumber} not found in bank.",
          pack.SeedKey,
          questionNumber);
        continue;
      }

      var question = new Question
      {
        Text = bankQuestion.Soru.Trim(),
        Explanation = string.IsNullOrWhiteSpace(bankQuestion.Aciklama)
          ? null
          : bankQuestion.Aciklama.Trim(),
        Points = 10,
        SortOrder = sortOrder
      };

      string correctKey = bankQuestion.DogruCevap.Trim().ToUpperInvariant();

      foreach (string optionKey in OptionOrder)
      {
        if (!bankQuestion.Secenekler.TryGetValue(optionKey, out string? optionText))
        {
          logger.LogWarning(
            "Quiz seed pack {SeedKey} question {QuestionNumber}: missing option {OptionKey}.",
            pack.SeedKey,
            questionNumber,
            optionKey);
          continue;
        }

        question.Answers.Add(new Answer
        {
          Text = optionText.Trim(),
          IsCorrect = string.Equals(optionKey, correctKey, StringComparison.OrdinalIgnoreCase)
        });
      }

      if (question.Answers.Count(a => a.IsCorrect) != 1)
      {
        logger.LogWarning(
          "Quiz seed pack {SeedKey} question {QuestionNumber}: expected exactly one correct answer (dogru_cevap={CorrectKey}).",
          pack.SeedKey,
          questionNumber,
          bankQuestion.DogruCevap);
        continue;
      }

      quiz.Questions.Add(question);
      sortOrder++;
    }

    return quiz;
  }

  private static string? ResolveQuizBankPath()
  {
    const string fileName = "trabzonly-quiz.json";

    var startDirectories = new List<string>();

    string cwd = Directory.GetCurrentDirectory();
    startDirectories.Add(cwd);
    startDirectories.Add(AppContext.BaseDirectory);

    foreach (string start in startDirectories.Distinct(StringComparer.OrdinalIgnoreCase))
    {
      DirectoryInfo? dir = new(start);

      while (dir != null)
      {
        string candidate = Path.Combine(dir.FullName, fileName);

        if (File.Exists(candidate))
        {
          return candidate;
        }

        dir = dir.Parent;
      }
    }

    return null;
  }
}
