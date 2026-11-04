namespace Api.Features.Users;

// Responses
public class UserResponseDto
{
  public Guid Id { get; set; }
  public string Username { get; set; } = null!;
  public string Email { get; set; } = null!;
  public string? Bio { get; set; }
  public string? DisplayTag { get; set; }
  public string? ProfileImageUrl { get; set; }
  public bool IsActive { get; set; }
  public DateTime CreatedDate { get; set; }
  public DateTime? UpdatedDate { get; set; }
  public int RoleId { get; set; }
  public string RoleName { get; set; } = null!;
  public int FollowerCount { get; set; }
  public int FollowingCount { get; set; }
  public bool? IsFollowedByCurrentUser { get; set; }
}

public sealed record UserAdminListItemDto(
  Guid Id,
  string Username,
  string Email,
  string? ProfileImageUrl,
  bool IsActive,
  DateTime CreatedDate,
  int RoleId,
  string RoleName,
  int PostCount,
  int SquadCount);

public sealed record UserAdminDetailDto(
  Guid Id,
  string Username,
  string Email,
  string? Bio,
  string? DisplayTag,
  string? ProfileImageUrl,
  bool IsActive,
  DateTime CreatedDate,
  DateTime? UpdatedDate,
  int RoleId,
  string RoleName);

public sealed record UserPreviewDto
{
  public Guid Id { get; init; }
  public string Username { get; init; } = null!;
  public string? ProfileImageUrl { get; init; }
  public string RoleName { get; init; } = null!;
  public int PostCount { get; init; }
  public int TotalLikeCount { get; init; }
  public int FollowerCount { get; init; }
  public int FollowingCount { get; init; }
  public DateTime CreatedDate { get; init; }
}

public sealed record PublicUserProfileDto
{
  public Guid Id { get; init; }
  public string Username { get; init; } = null!;
  public string? Bio { get; init; }
  public string? DisplayTag { get; init; }
  public string? ProfileImageUrl { get; init; }
  public DateTime CreatedDate { get; init; }
  public int FollowerCount { get; init; }
  public int FollowingCount { get; init; }
  public bool? IsFollowedByCurrentUser { get; init; }
  public int PostCount { get; init; }
  public int SquadCount { get; init; }
  public int QuizAttemptCount { get; init; }
  public int? QuizAveragePercent { get; init; }
}

public sealed record CreatedUserResponseDto
{
  public Guid Id { get; init; }
  public string Username { get; init; } = null!;
}

public sealed record UserFollowResponseDto(
  Guid UserId,
  int FollowerCount,
  bool IsFollowedByCurrentUser);

// Requests
public sealed record UpdateUserRequest(
  string? Bio,
  string? DisplayTag,
  IFormFile? ImageFile);

public sealed record AdminUpdateUserRequest(
  string Username,
  string? Bio,
  string DisplayTag,
  int RoleId,
  bool IsActive,
  bool ClearProfileImage = false);

public sealed record AdminSetUserActiveRequest(bool IsActive);

public sealed record ChangePasswordRequest(string CurrentPassword, string NewPassword, string ConfirmNewPassword);

public sealed record UserAdminListQueryRequest(
  string? Search = null,
  int? RoleId = null,
  bool? IsActive = null,
  string? Sort = null,
  int PageNumber = 1,
  int PageSize = 10);

public static class UserAdminSortOptions
{
  public const string CreatedDesc = "created-desc";
  public const string NameAsc = "name-asc";
}
