namespace Api.Features.Quizzes;

public sealed record QuizCategoryResponseDto(
  int Id,
  string Name,
  string? Description,
  string? ImageUrl,
  bool IsActive);

public sealed record CreatedQuizCategoryResponseDto(
  int Id,
  string Name);

public sealed record CreateQuizCategoryRequest(
  string Name,
  string? Description,
  string? ImageUrl,
  bool IsActive);

public sealed record UpdateQuizCategoryRequest(
  int Id,
  string Name,
  string? Description,
  string? ImageUrl,
  bool IsActive);
