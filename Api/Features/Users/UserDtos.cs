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
  public int RoleId { get; set; }
  public string RoleName { get; set; } = null!;
  public int FollowerCount { get; set; }
  public int FollowingCount { get; set; }
  public bool? IsFollowedByCurrentUser { get; set; }
}

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
  string Username,
  string? Bio,
  string? DisplayTag,
  IFormFile? ImageFile);

public sealed record ChangePasswordRequest(string CurrentPassword, string NewPassword, string ConfirmNewPassword);
