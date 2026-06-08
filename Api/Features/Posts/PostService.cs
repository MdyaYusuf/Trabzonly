using System.Linq.Expressions;
using Api.Core.Helpers;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Posts;

public class PostService(
  IPostRepository _postRepository,
  PostMapper _mapper,
  PostBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreatePostRequest> _createValidator,
  IValidator<UpdatePostRequest> _updateValidator) : IPostService
{
  public async Task<ReturnModel<PagedResponse<PostResponseDto>>> GetAllAsync(
    Expression<Func<Post, bool>>? filter = null,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    Func<IQueryable<Post>, IOrderedQueryable<Post>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    var (posts, totalCount) = await _postRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter,
      include: include ?? (query => query.Include(b => b.User).Include(b => b.Category)),
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PostResponseDto> responseDtos = _mapper.EntityToResponseDtoList(posts);
    var pagedResponse = new PagedResponse<PostResponseDto>(responseDtos, totalCount, pageNumber, pageSize);

    return new ReturnModel<PagedResponse<PostResponseDto>>()
    {
      Success = true,
      Message = "Post listesi başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PostResponseDto>> GetAsync(
    Expression<Func<Post, bool>> predicate,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Post? post = await _postRepository.GetAsync(
      predicate,
      include: include ?? (query => query.Include(b => b.User).Include(b => b.Category)),
      enableTracking,
      cancellationToken);

    if (post == null)
    {
      return new ReturnModel<PostResponseDto>()
      {
        Success = true,
        Message = "Eşleşen post bulunamadı.",
        Data = null,
        StatusCode = 200
      };
    }

    PostResponseDto response = _mapper.EntityToResponseDto(post);

    return new ReturnModel<PostResponseDto>()
    {
      Success = true,
      Message = "Post başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PostResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Post post = await _businessRules.GetPostIfExistAsync(
      id,
      include: include ?? (query => query.Include(b => b.User).Include(b => b.Category)),
      enableTracking,
      cancellationToken);

    PostResponseDto response = _mapper.EntityToResponseDto(post);

    return new ReturnModel<PostResponseDto>()
    {
      Success = true,
      Message = "Post başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<PostResponseDto>>> GetTopCommentedPostsAsync(
    int count,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Post> posts = await _postRepository.GetTopCommentedPostsAsync(
      count,
      include: include ?? (query => query.Include(b => b.User).Include(b => b.Category)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PostResponseDto> response = _mapper.EntityToResponseDtoList(posts);

    return new ReturnModel<List<PostResponseDto>>()
    {
      Success = true,
      Message = "En çok yorum alan postlar başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CursorPagedResponse<PostResponseDto>>> GetRecentPostsAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Post> posts = await _postRepository.GetRecentPostsAsync(
      count + 1,
      lastDateCursor,
      lastIdCursor,
      include: include ?? (query => query.Include(b => b.User).Include(b => b.Category)),
      enableTracking,
      withDeleted,
      cancellationToken);

    bool hasNextPage = posts.Count > count;
    var itemsToReturn = hasNextPage ? posts.Take(count).ToList() : posts;

    List<PostResponseDto> response = _mapper.EntityToResponseDtoList(itemsToReturn);

    var pagedResponse = new CursorPagedResponse<PostResponseDto>
    {
      Items = response,
      NextCursorDate = itemsToReturn.LastOrDefault()?.CreatedDate,
      NextCursorId = itemsToReturn.LastOrDefault()?.Id,
      HasNextPage = hasNextPage
    };

    return new ReturnModel<CursorPagedResponse<PostResponseDto>>()
    {
      Success = true,
      Message = "En son eklenen postlar başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedPostResponseDto>> AddAsync(
    CreatePostRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.UserCannotExceedDailyPostLimitAsync(currentUserId, userRole, cancellationToken);
    await _businessRules.UserMustWaitBetweenPostsAsync(currentUserId, userRole, cancellationToken);
    await _businessRules.PostTitleMustBeUniqueAsync(request.Title, cancellationToken);

    Post post = _mapper.CreateToEntity(request);
    post.UserId = currentUserId;

    if (request.ImageFile != null)
    {
      post.ImageUrl = await FileHelper.SaveImageToDisk(
        request.ImageFile,
        "posts",
        request.Title,
        cancellationToken);
    }

    await _postRepository.AddAsync(post, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedPostResponseDto response = _mapper.EntityToCreatedResponseDto(post);

    return new ReturnModel<CreatedPostResponseDto>()
    {
      Success = true,
      Message = "Post başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdatePostRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.PostTitleCannotBeDuplicatedWhenUpdated(request.Id, request.Title, cancellationToken);

    Post post = await _businessRules.GetPostIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.UserMustBeOwnerOrAdmin(post.UserId, currentUserId, userRole);

    post.ImageUrl = await FileHelper.ReplaceImageOnDisk(
      request.ImageFile,
      post.ImageUrl,
      "posts",
      request.Title,
      cancellationToken);

    _mapper.UpdateEntityFromRequest(request, post);

    _postRepository.Update(post);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Post başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    Post post = await _businessRules.GetPostIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.UserMustBeOwnerOrAdmin(post.UserId, currentUserId, userRole);

    FileHelper.DeleteImageFromDisk(post.ImageUrl);

    _postRepository.Delete(post);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Post başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }
}