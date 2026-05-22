namespace Api.Features.Quizzes;

// Responses
public sealed record QuizResponseDto(
  Guid Id,
  string Title,
  string? Description,
  bool IsActive,
  List<QuestionResponseDto> Questions);

public sealed record QuestionResponseDto(
  Guid Id,
  string Text,
  int Points,
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

// Requests
public sealed record CreateQuizRequest(string Title, string? Description, List<CreateQuestionRequest> Questions);

public sealed record CreateQuestionRequest(string Text, int Points, List<CreateAnswerRequest> Answers);

public sealed record CreateAnswerRequest(string Text, bool IsCorrect);

public sealed record UpdateQuizRequest(Guid Id, string Title, string? Description, bool IsActive);

public sealed record SubmitQuizRequest(Guid QuizId, Guid UserId, TimeSpan CompletionTime, List<QuestionAnswerDto> Answers);

public sealed record QuestionAnswerDto(Guid QuestionId, Guid AnswerId);