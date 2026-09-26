using System.Linq.Expressions;
using Api.Core.Helpers;
using Api.Core.Repositories;
using Api.Core.Responses;
using Api.Core.Security;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Users;

public class UserService(
  IUserRepository _userRepository,
  UserMapper _mapper,
  UserBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<UpdateUserRequest> _updateValidator,
  IValidator<ChangePasswordRequest> _changePasswordValidator) : IUserService
{
  public async Task<ReturnModel<PagedResponse<UserResponseDto>>> GetAllAsync(
    Guid currentUserId,
    string userRole,
    Expression<Func<User, bool>>? filter = null,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    Func<IQueryable<User>, IOrderedQueryable<User>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    _businessRules.UserMustBeOwnerOrAdmin(Guid.Empty, currentUserId, userRole);

    var (users, totalCount) = await _userRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter,
      include: include ?? (query => query.Include(u => u.Role)),
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    List<UserResponseDto> responseDtos = _mapper.EntityToResponseDtoList(users);
    var pagedResponse = new PagedResponse<UserResponseDto>(responseDtos, totalCount, pageNumber, pageSize);

    return new ReturnModel<PagedResponse<UserResponseDto>>()
    {
      Success = true,
      Message = "Kullanıcı listesi başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<UserResponseDto>> GetAsync(
    Expression<Func<User, bool>> predicate,
    Guid currentUserId,
    string userRole,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    User? user = await _userRepository.GetAsync(
      predicate,
      include: query => query.Include(u => u.Role),
      enableTracking,
      cancellationToken);

    if (user == null)
    {
      return new ReturnModel<UserResponseDto>()
      {
        Success = true,
        Message = "Eşleşen kullanıcı bulunamadı.",
        Data = null,
        StatusCode = 200
      };
    }

    _businessRules.UserMustBeOwnerOrAdmin(user.Id, currentUserId, userRole);

    UserResponseDto response = _mapper.EntityToResponseDto(user);

    return new ReturnModel<UserResponseDto>()
    {
      Success = true,
      Message = "Kullanıcı bilgileri başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<UserResponseDto>> GetByIdAsync(
    Guid id,
    Guid currentUserId,
    string userRole,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    User user = await _businessRules.GetUserIfExistAsync(
      id,
      include: query => query.Include(u => u.Role),
      enableTracking,
      cancellationToken);

    _businessRules.UserMustBeOwnerOrAdmin(user.Id, currentUserId, userRole);

    UserResponseDto response = _mapper.EntityToResponseDto(user);

    return new ReturnModel<UserResponseDto>()
    {
      Success = true,
      Message = "Kullanıcı bilgileri başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<UserPreviewDto>>> GetTopContributorsAsync(
    int count,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<User> query = _userRepository.Query(enableTracking, withDeleted)
      .Where(u => u.IsActive);

    if (include != null)
    {
      query = include(query);
    }

    List<UserPreviewDto> response = await query
      .OrderByDescending(u => u.Posts.Count + u.Comments.Count)
      .Take(count)
      .Select(u => new UserPreviewDto
      {
        Id = u.Id,
        Username = u.Username,
        ProfileImageUrl = u.ProfileImageUrl,
        RoleName = u.Role.Name,
        PostCount = u.Posts.Count(p => p.IsActive),
        TotalLikeCount = u.Posts.Where(p => p.IsActive).Sum(p => p.LikeCount),
        CreatedDate = u.CreatedDate
      })
      .ToListAsync(cancellationToken);

    return new ReturnModel<List<UserPreviewDto>>()
    {
      Success = true,
      Message = "En çok katkıda bulunan kullanıcılar başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CursorPagedResponse<UserPreviewDto>>> GetNewestMembersAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<User> query = _userRepository.Query(enableTracking, withDeleted)
      .Where(u => u.IsActive);

    if (lastDateCursor.HasValue && lastIdCursor.HasValue)
    {
      DateTime cursorDate = lastDateCursor.Value;
      Guid cursorId = lastIdCursor.Value;

      query = query.Where(u =>
        u.CreatedDate < cursorDate ||
        (u.CreatedDate == cursorDate && u.Id.CompareTo(cursorId) < 0));
    }

    if (include != null)
    {
      query = include(query);
    }

    List<UserPreviewDto> users = await query
      .OrderByDescending(u => u.CreatedDate)
      .ThenByDescending(u => u.Id)
      .Take(count + 1)
      .Select(u => new UserPreviewDto
      {
        Id = u.Id,
        Username = u.Username,
        ProfileImageUrl = u.ProfileImageUrl,
        RoleName = u.Role.Name,
        PostCount = u.Posts.Count(p => p.IsActive),
        TotalLikeCount = u.Posts.Where(p => p.IsActive).Sum(p => p.LikeCount),
        CreatedDate = u.CreatedDate
      })
      .ToListAsync(cancellationToken);

    bool hasNextPage = users.Count > count;
    List<UserPreviewDto> itemsToReturn = hasNextPage ? users.Take(count).ToList() : users;

    var pagedResponse = new CursorPagedResponse<UserPreviewDto>
    {
      Items = itemsToReturn,
      NextCursorDate = itemsToReturn.LastOrDefault()?.CreatedDate,
      NextCursorId = itemsToReturn.LastOrDefault()?.Id,
      HasNextPage = hasNextPage
    };

    return new ReturnModel<CursorPagedResponse<UserPreviewDto>>()
    {
      Success = true,
      Message = "En yeni üyeler başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdateUserRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    User user = await _businessRules.GetUserIfExistAsync(currentUserId, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.UsernameCannotBeRestrictedWord(request.Username);
    await _businessRules.UsernameMustBeUniqueAsync(request.Username, user.Id, cancellationToken);

    user.ProfileImageUrl = await FileHelper.ReplaceImageOnDisk(
      request.ImageFile,
      user.ProfileImageUrl,
      "profiles",
      request.Username,
      cancellationToken);

    _mapper.UpdateEntityFromRequest(request, user);

    _userRepository.Update(user);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Profil bilgileriniz başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> ChangePasswordAsync(
    ChangePasswordRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _changePasswordValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    User user = await _businessRules.GetUserIfExistAsync(currentUserId, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.PasswordMustMatch(request.CurrentPassword, user.PasswordHash, user.PasswordKey);

    HashingHelper.CreatePasswordHash(request.NewPassword, out string hash, out string key);
    user.PasswordHash = hash;
    user.PasswordKey = key;

    _userRepository.Update(user);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Şifreniz başarılı bir şekilde değiştirildi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.UserMustBeOwnerOrAdmin(id, currentUserId, userRole);

    User user = await _businessRules.GetUserIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    await _businessRules.CannotDeleteLastAdminAsync(user, cancellationToken);

    _userRepository.Delete(user);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Kullanıcı hesabı başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }
}
