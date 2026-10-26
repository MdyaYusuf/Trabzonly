namespace Api.Features.Quizzes.Seed;

public sealed record QuizSeedPack(
  string SeedKey,
  QuizCategory Category,
  string Title,
  string Description,
  IReadOnlyList<int> QuestionNumbers);
