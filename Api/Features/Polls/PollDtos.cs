namespace Api.Features.Polls;

// Responses
public sealed record PollOptionResponseDto(
  int Id,
  string Label,
  int SortOrder,
  int VoteCount,
  double Percentage);

public sealed record PollResponseDto(
  int Id,
  string Question,
  bool IsActive,
  int? PlayerId,
  Guid? PostId,
  int TotalVotes,
  int? CurrentUserOptionId,
  IReadOnlyList<PollOptionResponseDto> Options);

public sealed record PollAdminListItemDto(
  int Id,
  string Question,
  bool IsActive,
  string Scope,
  int? PlayerId,
  string? PlayerName,
  Guid? PostId,
  string? PostTitle,
  int OptionCount,
  int TotalVotes,
  DateTime CreatedDate,
  DateTime? UpdatedDate);

public sealed record PollAdminDetailDto(
  int Id,
  string Question,
  bool IsActive,
  string Scope,
  int? PlayerId,
  string? PlayerName,
  Guid? PostId,
  string? PostTitle,
  int TotalVotes,
  bool OptionsLocked,
  DateTime CreatedDate,
  DateTime? UpdatedDate,
  IReadOnlyList<PollOptionResponseDto> Options);

public sealed record CreatedPollResponseDto(
  int Id,
  string Question,
  bool IsActive,
  int? PlayerId,
  Guid? PostId);

// Requests
public sealed record CreatePollOptionRequest(
  string Label,
  int SortOrder);

public sealed record CreatePollRequest(
  string Question,
  int? PlayerId,
  Guid? PostId,
  bool IsActive,
  IReadOnlyList<CreatePollOptionRequest> Options);

public sealed record UpdatePollRequest(
  int Id,
  string Question,
  bool IsActive,
  IReadOnlyList<CreatePollOptionRequest>? Options = null);

public sealed record VotePollRequest(
  int OptionId);

public sealed record PollAdminListQueryRequest(
  string? Search = null,
  bool? IsActive = null,
  string? Scope = null,
  string? Sort = null,
  int PageNumber = 1,
  int PageSize = 10);
