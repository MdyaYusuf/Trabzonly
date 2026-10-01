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
  int TotalVotes,
  int? CurrentUserOptionId,
  IReadOnlyList<PollOptionResponseDto> Options);

public sealed record CreatedPollResponseDto(
  int Id,
  string Question,
  bool IsActive,
  int? PlayerId);

// Requests
public sealed record CreatePollOptionRequest(
  string Label,
  int SortOrder);

public sealed record CreatePollRequest(
  string Question,
  int? PlayerId,
  bool IsActive,
  IReadOnlyList<CreatePollOptionRequest> Options);

public sealed record UpdatePollRequest(
  int Id,
  string Question,
  bool IsActive);

public sealed record VotePollRequest(
  int OptionId);
