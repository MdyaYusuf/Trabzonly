namespace Api.Features.Quizzes;

// Responses
public sealed record QuizResponseDto(
  Guid Id,
  string Title,
  string? Description,
  QuizCategory Category,
  bool IsActive,
  List<QuestionResponseDto> Questions);

public sealed record QuestionResponseDto(
  Guid Id,
  string Text,
  string? Explanation,
  int Points,
  int SortOrder,
  List<AnswerResponseDto> Answers);

public sealed record AnswerResponseDto(
  Guid Id,
  string Text,
  bool IsCorrect);

public sealed record UserQuizResultResponseDto(
  Guid Id,
  Guid QuizId,
  Guid UserId,
  int Score,
  TimeSpan CompletionTime,
  DateTime CompletedAt);

public sealed record CreatedQuizResponseDto(
  Guid Id,
  string Title);

public sealed record QuizPreviewDto(
  Guid Id,
  string Title,
  string? Description,
  QuizCategory Category,
  bool IsActive);

// Requests
public sealed record CreateQuizRequest(
  string Title,
  string? Description,
  QuizCategory Category,
  List<CreateQuestionRequest> Questions);

public sealed record CreateQuestionRequest(
  string Text,
  string? Explanation,
  int Points,
  int SortOrder,
  List<CreateAnswerRequest> Answers);

public sealed record CreateAnswerRequest(string Text, bool IsCorrect);

public sealed record UpdateQuizRequest(
  Guid Id,
  string Title,
  string? Description,
  QuizCategory Category,
  bool IsActive);

public sealed record SubmitQuizRequest(Guid QuizId, TimeSpan CompletionTime, List<QuestionAnswerDto> Answers);

public sealed record QuestionAnswerDto(Guid QuestionId, Guid AnswerId);
