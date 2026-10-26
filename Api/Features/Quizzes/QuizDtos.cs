namespace Api.Features.Quizzes;

// Responses — admin / full (may include IsCorrect)
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
  int MaxScore,
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

// Public list (no questions, no answers)
public sealed record QuizListItemDto(
  Guid Id,
  string Title,
  string? Description,
  QuizCategory Category,
  int QuestionCount,
  int TakenCount,
  bool IsActive);

// Take attempt (no IsCorrect, no Explanation)
public sealed record QuizTakeDto(
  Guid Id,
  string Title,
  string? Description,
  QuizCategory Category,
  List<QuizTakeQuestionDto> Questions);

public sealed record QuizTakeQuestionDto(
  Guid Id,
  string Text,
  int Points,
  int SortOrder,
  List<QuizTakeAnswerDto> Answers);

public sealed record QuizTakeAnswerDto(
  Guid Id,
  string Text);

// Per-question check
public sealed record CheckQuizAnswerRequest(
  Guid QuizId,
  Guid QuestionId,
  Guid? AnswerId);

public sealed record CheckQuizAnswerResponse(
  bool IsCorrect,
  Guid CorrectAnswerId,
  string? Explanation);

// Platform / leaderboard / me stats
public sealed record QuizPlatformStatsDto(
  int TotalQuizzes,
  int TotalCompletions,
  double AverageScore,
  string? TopUsername);

public sealed record QuizLeaderboardEntryDto(
  int Rank,
  string Username,
  double AverageScore,
  TimeSpan AverageCompletionTime,
  int DistinctQuizCount);

public sealed record QuizUserStatsDto(
  double AverageScore,
  TimeSpan AverageCompletionTime,
  int AttemptsCount,
  int DistinctQuizCount);

// Requests — admin create/update
public sealed record CreateQuizRequest(
  string Title,
  string? Description,
  QuizCategory Category,
  bool IsActive,
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
  bool IsActive,
  List<CreateQuestionRequest>? Questions = null);

public sealed record SubmitQuizRequest(Guid QuizId, TimeSpan CompletionTime, List<QuestionAnswerDto> Answers);

public sealed record QuestionAnswerDto(Guid QuestionId, Guid AnswerId);
