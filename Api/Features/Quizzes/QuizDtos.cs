namespace Api.Features.Quizzes;

// Responses — admin / full (may include IsCorrect)
public sealed record QuizResponseDto(
  int Id,
  string Title,
  string? Description,
  int QuizCategoryId,
  string CategoryName,
  string? CategoryImageUrl,
  bool IsActive,
  List<QuestionResponseDto> Questions);

public sealed record QuestionResponseDto(
  int Id,
  string Text,
  string? Explanation,
  int Points,
  int SortOrder,
  List<AnswerResponseDto> Answers);

public sealed record AnswerResponseDto(
  int Id,
  string Text,
  bool IsCorrect);

public sealed record UserQuizResultResponseDto(
  int Id,
  int QuizId,
  Guid UserId,
  int Score,
  int MaxScore,
  TimeSpan CompletionTime,
  DateTimeOffset CompletedAt);

public sealed record CreatedQuizResponseDto(
  int Id,
  string Title);

public sealed record QuizPreviewDto(
  int Id,
  string Title,
  string? Description,
  int QuizCategoryId,
  string CategoryName,
  string? CategoryImageUrl,
  bool IsActive);

public sealed record QuizAdminListItemDto(
  int Id,
  string Title,
  string? Description,
  int QuizCategoryId,
  string CategoryName,
  int QuestionCount,
  bool IsActive);

public sealed record QuizAdminListQueryRequest(
  string? Search = null,
  bool? IsActive = null,
  int? QuizCategoryId = null,
  string? Sort = null,
  int PageNumber = 1,
  int PageSize = 10);

public static class QuizAdminSortOptions
{
  public const string TitleAsc = "title-asc";
  public const string QuestionsAsc = "questions-asc";
  public const string QuestionsDesc = "questions-desc";
}

// Public list (no questions, no answers)
public sealed record QuizListItemDto(
  int Id,
  string Title,
  string? Description,
  int QuizCategoryId,
  string CategoryName,
  string? CategoryImageUrl,
  int QuestionCount,
  int TakenCount,
  double? AverageSuccessPercent,
  bool IsActive);

// Take attempt (no IsCorrect, no Explanation)
public sealed record QuizTakeDto(
  int Id,
  string Title,
  string? Description,
  int QuizCategoryId,
  string CategoryName,
  string? CategoryImageUrl,
  List<QuizTakeQuestionDto> Questions);

public sealed record QuizTakeQuestionDto(
  int Id,
  string Text,
  int Points,
  int SortOrder,
  List<QuizTakeAnswerDto> Answers);

public sealed record QuizTakeAnswerDto(
  int Id,
  string Text);

// Per-question check
public sealed record CheckQuizAnswerRequest(
  int QuizId,
  int QuestionId,
  int? AnswerId);

public sealed record CheckQuizAnswerResponse(
  bool IsCorrect,
  int CorrectAnswerId,
  string? Explanation);

// Platform / leaderboard / me stats
public sealed record QuizPlatformStatsDto(
  int TotalQuizzes,
  string? TopUsername);

public sealed record QuizLeaderboardEntryDto(
  int Rank,
  string Username,
  string? ProfileImageUrl,
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
  int QuizCategoryId,
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
  int Id,
  string Title,
  string? Description,
  int QuizCategoryId,
  bool IsActive,
  List<CreateQuestionRequest>? Questions = null);

public sealed record SubmitQuizRequest(int QuizId, TimeSpan CompletionTime, List<QuestionAnswerDto> Answers);

public sealed record QuestionAnswerDto(int QuestionId, int AnswerId);
