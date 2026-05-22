using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Comments;

public class CommentService(
  ICommentRepository _commentRepository,
  CommentMapper _mapper,
  CommentBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreateCommentRequest> _createValidator,
  IValidator<UpdateCommentRequest> _updateValidator) : ICommentService
{
  public async Task<ReturnModel<List<CommentResponseDto>>> GetAllAsync(
    Expression<Func<Comment, bool>>? filter = null,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    Func<IQueryable<Comment>, IOrderedQueryable<Comment>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Comment> comments = await _commentRepository.GetAllAsync(
      filter,
      include: include ?? (query => query.Include(c => c.User)),
      orderBy: orderBy ?? (query => query.OrderByDescending(c => c.CreatedDate)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<CommentResponseDto> response = _mapper.EntityToResponseDtoList(comments);

    return new ReturnModel<List<CommentResponseDto>>()
    {
      Success = true,
      Message = "Yorum listesi başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CommentResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Comment comment = await _businessRules.GetCommentIfExistAsync(
      id,
      include: include ?? (query => query.Include(c => c.User)),
      enableTracking,
      cancellationToken);

    CommentResponseDto response = _mapper.EntityToResponseDto(comment);

    return new ReturnModel<CommentResponseDto>()
    {
      Success = true,
      Message = "Yorum başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CommentResponseDto>> AddAsync(
    CreateCommentRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Comment comment = _mapper.CreateToEntity(request);
    comment.UserId = currentUserId;
    comment.IsApproved = true;

    await _commentRepository.AddAsync(comment, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CommentResponseDto response = _mapper.EntityToResponseDto(comment);

    return new ReturnModel<CommentResponseDto>()
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

    _commentRepository.Delete(comment);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Yorum başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }
}