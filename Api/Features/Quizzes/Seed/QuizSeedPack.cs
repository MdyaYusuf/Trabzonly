namespace Api.Features.Quizzes.Seed;

public sealed record QuizSeedPack(
  string SeedKey,
  string CategorySeedKey,
  string Title,
  string Description,
  IReadOnlyList<int> QuestionNumbers);
