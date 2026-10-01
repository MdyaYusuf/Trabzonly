using System.Linq.Expressions;
using Api.Core.Exceptions;
using Api.Core.Repositories;
using Api.Core.Responses;
using Api.Features.Posts;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Comments;

public class CommentService(
  ICommentRepository _commentRepository,
  ICommentReactionRepository _commentReactionRepository,
  IPostRepository _postRepository,
  CommentMapper _mapper,
  CommentBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreateCommentRequest> _createValidator,
  IValidator<UpdateCommentRequest> _updateValidator) : ICommentService
{
  public async Task<ReturnModel<PagedResponse<CommentResponseDto>>> GetAllAsync(
    Expression<Func<Comment, bool>>? filter = null,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    Func<IQueryable<Comment>, IOrderedQueryable<Comment>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    Guid? currentUserId = null,
    CancellationToken cancellationToken = default)
  {
    var (comments, totalCount) = await _commentRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter,
      include: include ?? (query => query.Include(c => c.User)),
      orderBy: orderBy ?? (query => query.OrderByDescending(c => c.CreatedDate)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<CommentResponseDto> responseDtos = await MapWithReactionsAsync(
      comments,
      currentUserId,
      cancellationToken);

    var pagedResponse = new PagedResponse<CommentResponseDto>(responseDtos, totalCount, pageNumber, pageSize);

    return new ReturnModel<PagedResponse<CommentResponseDto>>()
    {
      Success = true,
      Message = "Yorum listesi başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CursorPagedResponse<CommentResponseDto>>> GetRecentCommentsAsync(
    int count,
    Expression<Func<Comment, bool>>? filter = null,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    Func<IQueryable<Comment>, IOrderedQueryable<Comment>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    Guid? currentUserId = null,
    CancellationToken cancellationToken = default)
  {
    List<Comment> comments = await _commentRepository.GetRecentCommentsAsync(
      count + 1,
      filter,
      lastDateCursor,
      lastIdCursor,
      include: include ?? (query => query.Include(c => c.User)),
      orderBy: orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    bool hasNextPage = comments.Count > count;
    var itemsToReturn = hasNextPage ? comments.Take(count).ToList() : comments;

    List<Comment> flatComments = [];

    foreach (Comment comment in itemsToReturn)
    {
      flatComments.Add(comment);

      if (comment.Replies.Count > 0)
      {
        flatComments.AddRange(
          comment.Replies
            .Where(r => r.IsApproved)
            .OrderBy(r => r.CreatedDate)
            .ThenBy(r => r.Id));
      }
    }

    List<CommentResponseDto> response = await MapWithReactionsAsync(
      flatComments,
      currentUserId,
      cancellationToken);

    var pagedResponse = new CursorPagedResponse<CommentResponseDto>
    {
      Items = response,
      NextCursorDate = itemsToReturn.LastOrDefault()?.CreatedDate,
      NextCursorId = itemsToReturn.LastOrDefault()?.Id.ToString(),
      HasNextPage = hasNextPage
    };

    return new ReturnModel<CursorPagedResponse<CommentResponseDto>>()
    {
      Success = true,
      Message = "Yorumlar başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CommentResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    bool enableTracking = false,
    Guid? currentUserId = null,
    CancellationToken cancellationToken = default)
  {
    Comment comment = await _businessRules.GetCommentIfExistAsync(
      id,
      include: include ?? (query => query.Include(c => c.User)),
      enableTracking,
      cancellationToken);

    List<CommentResponseDto> mapped = await MapWithReactionsAsync(
      [comment],
      currentUserId,
      cancellationToken);

    return new ReturnModel<CommentResponseDto>()
    {
      Success = true,
      Message = "Yorum başarılı bir şekilde getirildi.",
      Data = mapped[0],
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedCommentResponseDto>> AddAsync(
    CreateCommentRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.UserCannotExceedDailyCommentLimitAsync(currentUserId, userRole, cancellationToken);
    await _businessRules.UserMustWaitBetweenCommentsAsync(currentUserId, userRole, cancellationToken);
    await _businessRules.CommentContentCannotBeDuplicatedByUserAsync(currentUserId, request.Content, cancellationToken);

    Comment comment = _mapper.CreateToEntity(request);
    comment.UserId = currentUserId;
    comment.IsApproved = true;

    if (request.ParentCommentId.HasValue)
    {
      Comment parent = await _businessRules.GetCommentIfExistAsync(
        request.ParentCommentId.Value,
        cancellationToken: cancellationToken);

      comment.PostId ??= parent.PostId;
      comment.PlayerId ??= parent.PlayerId;
    }

    await _commentRepository.AddAsync(comment, cancellationToken);

    if (comment.PostId.HasValue)
    {
      await AdjustPostCommentCountAsync(comment.PostId.Value, delta: 1, cancellationToken);
    }

    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedCommentResponseDto response = _mapper.EntityToCreatedResponseDto(comment);

    return new ReturnModel<CreatedCommentResponseDto>()
    {
      Success = true,
      Message = "Yorum başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdateCommentRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Comment comment = await _businessRules.GetCommentIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.UserMustBeOwnerOrAdmin(comment.UserId, currentUserId, userRole);

    _mapper.UpdateEntityFromRequest(request, comment);

    _commentRepository.Update(comment);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Yorum başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    Comment comment = await _businessRules.GetCommentIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.UserMustBeOwnerOrAdmin(comment.UserId, currentUserId, userRole);

    if (comment.PostId.HasValue)
    {
      await AdjustPostCommentCountAsync(comment.PostId.Value, delta: -1, cancellationToken);
    }

    _commentRepository.Delete(comment);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Yorum başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CommentReactionResponseDto>> ReactAsync(
    Guid commentId,
    Guid currentUserId,
    CommentReactionType reactionType,
    CancellationToken cancellationToken = default)
  {
    Comment comment = await _businessRules.GetCommentIfExistAsync(
      commentId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    CommentReaction? existingReaction = await _commentReactionRepository.GetAsync(
      predicate: r => r.CommentId == commentId && r.UserId == currentUserId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    CommentReactionType? currentReaction = await ApplyReactionAsync(
      comment,
      existingReaction,
      currentUserId,
      reactionType,
      cancellationToken);

    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<CommentReactionResponseDto>()
    {
      Success = true,
      Message = "Tepki başarılı bir şekilde kaydedildi.",
      Data = new CommentReactionResponseDto(
        comment.Id,
        comment.LikeCount,
        comment.DislikeCount,
        currentReaction),
      StatusCode = 200
    };
  }

  private async Task<CommentReactionType?> ApplyReactionAsync(
    Comment comment,
    CommentReaction? existingReaction,
    Guid currentUserId,
    CommentReactionType reactionType,
    CancellationToken cancellationToken)
  {
    if (existingReaction == null)
    {
      var reaction = new CommentReaction
      {
        CommentId = comment.Id,
        UserId = currentUserId,
        Type = reactionType
      };

      await _commentReactionRepository.AddAsync(reaction, cancellationToken);

      if (reactionType == CommentReactionType.Like)
      {
        comment.LikeCount++;
      }
      else
      {
        comment.DislikeCount++;
      }

      _commentRepository.Update(comment);

      return reactionType;
    }

    if (existingReaction.Type == reactionType)
    {
      if (reactionType == CommentReactionType.Like)
      {
        comment.LikeCount = Math.Max(0, comment.LikeCount - 1);
      }
      else
      {
        comment.DislikeCount = Math.Max(0, comment.DislikeCount - 1);
      }

      _commentReactionRepository.Delete(existingReaction);
      _commentRepository.Update(comment);

      return null;
    }

    if (existingReaction.Type == CommentReactionType.Like)
    {
      comment.LikeCount = Math.Max(0, comment.LikeCount - 1);
      comment.DislikeCount++;
    }
    else
    {
      comment.DislikeCount = Math.Max(0, comment.DislikeCount - 1);
      comment.LikeCount++;
    }

    existingReaction.Type = reactionType;
    _commentReactionRepository.Update(existingReaction);
    _commentRepository.Update(comment);

    return reactionType;
  }

  private async Task<List<CommentResponseDto>> MapWithReactionsAsync(
    List<Comment> comments,
    Guid? currentUserId,
    CancellationToken cancellationToken)
  {
    List<CommentResponseDto> responseDtos = _mapper.EntityToResponseDtoList(comments);

    if (!currentUserId.HasValue || responseDtos.Count == 0)
    {
      return responseDtos;
    }

    List<Guid> commentIds = responseDtos.Select(c => c.Id).ToList();
    Guid userId = currentUserId.Value;

    List<CommentReaction> reactions = await _commentReactionRepository.GetAllAsync(
      filter: r => r.UserId == userId && commentIds.Contains(r.CommentId),
      enableTracking: false,
      cancellationToken: cancellationToken);

    Dictionary<Guid, CommentReactionType> reactionByCommentId = reactions
      .ToDictionary(r => r.CommentId, r => r.Type);

    return responseDtos
      .Select(dto =>
      {
        if (reactionByCommentId.TryGetValue(dto.Id, out CommentReactionType reactionType))
        {
          return dto with { CurrentUserReaction = reactionType };
        }

        return dto;
      })
      .ToList();
  }

  private async Task AdjustPostCommentCountAsync(
    Guid postId,
    int delta,
    CancellationToken cancellationToken)
  {
    Post? post = await _postRepository.GetByIdAsync(
      postId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (post == null)
    {
      throw new NotFoundException($"{postId} numaralı post bulunamadı.");
    }

    post.CommentCount = Math.Max(0, post.CommentCount + delta);
    _postRepository.Update(post);
  }
}
