using System.Linq.Expressions;
using Api.Core.Helpers;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Blogs;

public class BlogService(
  IBlogRepository _blogRepository,
  BlogMapper _mapper,
  BlogBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreateBlogRequest> _createValidator,
  IValidator<UpdateBlogRequest> _updateValidator) : IBlogService
{
  public async Task<ReturnModel<List<BlogResponseDto>>> GetAllAsync(
    Expression<Func<Blog, bool>>? filter = null,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    Func<IQueryable<Blog>, IOrderedQueryable<Blog>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Blog> blogs = await _blogRepository.GetAllAsync(
      filter,
      include: include ?? (query => query.Include(b => b.User).Include(b => b.Category)),
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    List<BlogResponseDto> response = _mapper.EntityToResponseDtoList(blogs);

    return new ReturnModel<List<BlogResponseDto>>()
    {
      Success = true,
      Message = "Blog listesi başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<BlogResponseDto>> GetAsync(
    Expression<Func<Blog, bool>> predicate,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Blog? blog = await _blogRepository.GetAsync(
      predicate,
      include: include ?? (query => query.Include(b => b.User).Include(b => b.Category)),
      enableTracking,
      cancellationToken);

    if (blog == null)
    {
      return new ReturnModel<BlogResponseDto>()
      {
        Success = true,
        Message = "Eşleşen blog bulunamadı.",
        Data = null,
        StatusCode = 200
      };
    }

    BlogResponseDto response = _mapper.EntityToResponseDto(blog);

    return new ReturnModel<BlogResponseDto>()
    {
      Success = true,
      Message = "Blog başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<BlogResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Blog blog = await _businessRules.GetBlogIfExistAsync(
      id,
      include: include ?? (query => query.Include(b => b.User).Include(b => b.Category)),
      enableTracking,
      cancellationToken);

    BlogResponseDto response = _mapper.EntityToResponseDto(blog);

    return new ReturnModel<BlogResponseDto>()
    {
      Success = true,
      Message = "Blog başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<BlogResponseDto>>> GetTopCommentedBlogsAsync(
    int count,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Blog> blogs = await _blogRepository.GetTopCommentedBlogsAsync(
      count,
      include: include ?? (query => query.Include(b => b.User).Include(b => b.Category)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<BlogResponseDto> response = _mapper.EntityToResponseDtoList(blogs);

    return new ReturnModel<List<BlogResponseDto>>()
    {
      Success = true,
      Message = "En çok yorum alan bloglar başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<BlogResponseDto>>> GetRecentBlogsAsync(
    int count,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Blog> blogs = await _blogRepository.GetRecentBlogsAsync(
      count,
      include: include ?? (query => query.Include(b => b.User).Include(b => b.Category)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<BlogResponseDto> response = _mapper.EntityToResponseDtoList(blogs);

    return new ReturnModel<List<BlogResponseDto>>()
    {
      Success = true,
      Message = "En son eklenen bloglar başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedBlogResponseDto>> AddAsync(
    CreateBlogRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.UserCannotExceedDailyBlogLimitAsync(currentUserId, userRole, cancellationToken);
    await _businessRules.UserMustWaitBetweenBlogPostsAsync(currentUserId, userRole, cancellationToken);
    await _businessRules.BlogTitleMustBeUniqueAsync(request.Title, cancellationToken);

    Blog blog = _mapper.CreateToEntity(request);
    blog.UserId = currentUserId;

    if (request.ImageFile != null)
    {
      blog.ImageUrl = await FileHelper.SaveImageToDisk(
        request.ImageFile,
        "blogs",
        request.Title,
        cancellationToken);
    }

    await _blogRepository.AddAsync(blog, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedBlogResponseDto response = _mapper.EntityToCreatedResponseDto(blog);

    return new ReturnModel<CreatedBlogResponseDto>()
    {
      Success = true,
      Message = "Blog başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdateBlogRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.BlogTitleCannotBeDuplicatedWhenUpdated(request.Id, request.Title, cancellationToken);

    Blog blog = await _businessRules.GetBlogIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.UserMustBeOwnerOrAdmin(blog.UserId, currentUserId, userRole);

    blog.ImageUrl = await FileHelper.ReplaceImageOnDisk(
      request.ImageFile,
      blog.ImageUrl,
      "blogs",
      request.Title,
      cancellationToken);

    _mapper.UpdateEntityFromRequest(request, blog);

    _blogRepository.Update(blog);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Blog başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    Blog blog = await _businessRules.GetBlogIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _businessRules.UserMustBeOwnerOrAdmin(blog.UserId, currentUserId, userRole);

    FileHelper.DeleteImageFromDisk(blog.ImageUrl);

    _blogRepository.Delete(blog);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Blog başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }
}