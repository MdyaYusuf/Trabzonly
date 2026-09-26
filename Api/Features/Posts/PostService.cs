using System.Linq.Expressions;
using Api.Core.Exceptions;
using Api.Core.Helpers;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Posts;

public class PostService(
  IPostRepository _postRepository,
  IPostReactionRepository _postReactionRepository,
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
    IQueryable<Post> query = _postRepository.Query(enableTracking, withDeleted);

    if (filter != null)
    {
      query = query.Where(filter);
    }

    if (include != null)
    {
      query = include(query);
    }

    if (orderBy != null)
    {
      query = orderBy(query);
    }

    int totalCount = await query.CountAsync(cancellationToken);

    List<PostResponseDto> responseDtos = await query
      .Skip((pageNumber - 1) * pageSize)
      .Take(pageSize)
      .Select(p => new PostResponseDto
      {
        Id = p.Id,
        Title = p.Title,
        Description = p.Description,
        Content = p.Content,
        ImageUrl = p.ImageUrl,
        IsActive = p.IsActive,
        LikeCount = p.LikeCount,
        DislikeCount = p.DislikeCount,
        CommentCount = p.CommentCount,
        CreatedDate = p.CreatedDate,
        UserId = p.UserId,
        AuthorUsername = p.User.Username,
        CategoryId = p.CategoryId,
        CategoryName = p.Category.Name
      })
      .ToListAsync(cancellationToken);

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
    IQueryable<Post> query = _postRepository.Query(enableTracking);

    if (include != null)
    {
      query = include(query);
    }

    PostResponseDto? response = await query
      .Where(predicate)
      .Select(p => new PostResponseDto
      {
        Id = p.Id,
        Title = p.Title,
        Description = p.Description,
        Content = p.Content,
        ImageUrl = p.ImageUrl,
        IsActive = p.IsActive,
        LikeCount = p.LikeCount,
        DislikeCount = p.DislikeCount,
        CommentCount = p.CommentCount,
        CreatedDate = p.CreatedDate,
        UserId = p.UserId,
        AuthorUsername = p.User.Username,
        CategoryId = p.CategoryId,
        CategoryName = p.Category.Name
      })
      .FirstOrDefaultAsync(cancellationToken);

    if (response == null)
    {
      return new ReturnModel<PostResponseDto>()
      {
        Success = true,
        Message = "Eşleşen post bulunamadı.",
        Data = null,
        StatusCode = 200
      };
    }

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
    IQueryable<Post> query = _postRepository.Query(enableTracking);

    if (include != null)
    {
      query = include(query);
    }

    PostResponseDto? response = await query
      .Where(p => p.Id == id)
      .Select(p => new PostResponseDto
      {
        Id = p.Id,
        Title = p.Title,
        Description = p.Description,
        Content = p.Content,
        ImageUrl = p.ImageUrl,
        IsActive = p.IsActive,
        LikeCount = p.LikeCount,
        DislikeCount = p.DislikeCount,
        CommentCount = p.CommentCount,
        CreatedDate = p.CreatedDate,
        UserId = p.UserId,
        AuthorUsername = p.User.Username,
        CategoryId = p.CategoryId,
        CategoryName = p.Category.Name
      })
      .FirstOrDefaultAsync(cancellationToken);

    if (response == null)
    {
      throw new NotFoundException($"{id} numaralı post bulunamadı.");
    }

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
    IQueryable<Post> query = _postRepository.Query(enableTracking, withDeleted)
      .Where(p => p.IsActive);

    if (include != null)
    {
      query = include(query);
    }

    List<PostResponseDto> response = await query
      .OrderByDescending(p => p.CommentCount)
      .Take(count)
      .Select(p => new PostResponseDto
      {
        Id = p.Id,
        Title = p.Title,
        Description = p.Description,
        Content = p.Content,
        ImageUrl = p.ImageUrl,
        IsActive = p.IsActive,
        LikeCount = p.LikeCount,
        DislikeCount = p.DislikeCount,
        CommentCount = p.CommentCount,
        CreatedDate = p.CreatedDate,
        UserId = p.UserId,
        AuthorUsername = p.User.Username,
        CategoryId = p.CategoryId,
        CategoryName = p.Category.Name
      })
      .ToListAsync(cancellationToken);

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
    IQueryable<Post> query = _postRepository.Query(enableTracking, withDeleted)
      .Where(p => p.IsActive);

    if (lastDateCursor.HasValue && lastIdCursor.HasValue)
    {
      DateTime cursorDate = lastDateCursor.Value;
      Guid cursorId = lastIdCursor.Value;

      query = query.Where(p =>
        p.CreatedDate < cursorDate ||
        (p.CreatedDate == cursorDate && p.Id.CompareTo(cursorId) < 0));
    }

    if (include != null)
    {
      query = include(query);
    }

    List<PostResponseDto> posts = await query
      .OrderByDescending(p => p.CreatedDate)
      .ThenByDescending(p => p.Id)
      .Take(count + 1)
      .Select(p => new PostResponseDto
      {
        Id = p.Id,
        Title = p.Title,
        Description = p.Description,
        Content = p.Content,
        ImageUrl = p.ImageUrl,
        IsActive = p.IsActive,
        LikeCount = p.LikeCount,
        DislikeCount = p.DislikeCount,
        CommentCount = p.CommentCount,
        CreatedDate = p.CreatedDate,
        UserId = p.UserId,
        AuthorUsername = p.User.Username,
        CategoryId = p.CategoryId,
        CategoryName = p.Category.Name
      })
      .ToListAsync(cancellationToken);

    bool hasNextPage = posts.Count > count;
    List<PostResponseDto> itemsToReturn = hasNextPage ? posts.Take(count).ToList() : posts;

    var pagedResponse = new CursorPagedResponse<PostResponseDto>
    {
      Items = itemsToReturn,
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

  public async Task<ReturnModel<PostReactionResponseDto>> ReactAsync(
    Guid postId,
    Guid currentUserId,
    PostReactionType reactionType,
    CancellationToken cancellationToken = default)
  {
    Post post = await _businessRules.GetPostIfExistAsync(
      postId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    _businessRules.PostMustBeActive(post);

    PostReaction? existingReaction = await _postReactionRepository.GetAsync(
      predicate: r => r.PostId == postId && r.UserId == currentUserId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    PostReactionType? currentReaction = await ApplyReactionAsync(
      post,
      existingReaction,
      currentUserId,
      reactionType,
      cancellationToken);

    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<PostReactionResponseDto>()
    {
      Success = true,
      Message = "Tepki başarılı bir şekilde kaydedildi.",
      Data = new PostReactionResponseDto(post.Id, post.LikeCount, post.DislikeCount, currentReaction),
      StatusCode = 200
    };
  }

  private async Task<PostReactionType?> ApplyReactionAsync(
    Post post,
    PostReaction? existingReaction,
    Guid currentUserId,
    PostReactionType reactionType,
    CancellationToken cancellationToken)
  {
    if (existingReaction == null)
    {
      var reaction = new PostReaction
      {
        PostId = post.Id,
        UserId = currentUserId,
        Type = reactionType
      };

      await _postReactionRepository.AddAsync(reaction, cancellationToken);

      if (reactionType == PostReactionType.Like)
      {
        post.LikeCount++;
      }
      else
      {
        post.DislikeCount++;
      }

      _postRepository.Update(post);

      return reactionType;
    }

    if (existingReaction.Type == reactionType)
    {
      if (reactionType == PostReactionType.Like)
      {
        post.LikeCount = Math.Max(0, post.LikeCount - 1);
      }
      else
      {
        post.DislikeCount = Math.Max(0, post.DislikeCount - 1);
      }

      _postReactionRepository.Delete(existingReaction);
      _postRepository.Update(post);

      return null;
    }

    if (existingReaction.Type == PostReactionType.Like)
    {
      post.LikeCount = Math.Max(0, post.LikeCount - 1);
      post.DislikeCount++;
    }
    else
    {
      post.DislikeCount = Math.Max(0, post.DislikeCount - 1);
      post.LikeCount++;
    }

    existingReaction.Type = reactionType;
    _postReactionRepository.Update(existingReaction);
    _postRepository.Update(post);

    return reactionType;
  }
}
