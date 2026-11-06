using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;

namespace Api.Features.Categories;

public class CategoryService(
  ICategoryRepository _categoryRepository,
  CategoryMapper _mapper,
  CategoryBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreateCategoryRequest> _createValidator,
  IValidator<UpdateCategoryRequest> _updateValidator) : ICategoryService
{
  public async Task<ReturnModel<PagedResponse<CategoryResponseDto>>> GetAllAsync(
    Expression<Func<Category, bool>>? filter = null,
    Func<IQueryable<Category>, IOrderedQueryable<Category>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    var (categories, totalCount) = await _categoryRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter,
      include: null,
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    List<CategoryResponseDto> responseDtos = _mapper.EntityToResponseDtoList(categories);
    var pagedResponse = new PagedResponse<CategoryResponseDto>(responseDtos, totalCount, pageNumber, pageSize);

    return new ReturnModel<PagedResponse<CategoryResponseDto>>()
    {
      Success = true,
      Message = "Kategori listesi başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<CategoryAdminListItemDto>>> GetAdminListAsync(
    CategoryAdminListQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    List<CategoryAdminListItemDto> items = await _categoryRepository.GetAdminListAsync(
      filter: BuildAdminListFilter(query),
      sort: query.Sort,
      cancellationToken: cancellationToken);

    return new ReturnModel<List<CategoryAdminListItemDto>>()
    {
      Success = true,
      Message = "Kategori yönetim listesi başarılı bir şekilde getirildi.",
      Data = items,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CategoryResponseDto>> GetByIdAsync(
    int id,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Category category = await _businessRules.GetCategoryIfExistAsync(
      id,
      enableTracking,
      cancellationToken);

    CategoryResponseDto response = _mapper.EntityToResponseDto(category);

    return new ReturnModel<CategoryResponseDto>()
    {
      Success = true,
      Message = "Kategori başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CategoryResponseDto>> AddAsync(
    CreateCategoryRequest request,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.CategoryNameMustBeUniqueAsync(request.Name, cancellationToken);

    Category category = _mapper.CreateToEntity(request);
    category.IsActive = true;

    await _categoryRepository.AddAsync(category, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CategoryResponseDto response = _mapper.EntityToResponseDto(category);

    return new ReturnModel<CategoryResponseDto>()
    {
      Success = true,
      Message = "Kategori başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdateCategoryRequest request,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.CategoryNameCannotBeDuplicatedWhenUpdated(request.Id, request.Name, cancellationToken);

    Category category = await _businessRules.GetCategoryIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _mapper.UpdateEntityFromRequest(request, category);

    _categoryRepository.Update(category);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Kategori başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    int id,
    CancellationToken cancellationToken = default)
  {
    Category category = await _businessRules.GetCategoryIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    await _businessRules.CategoryCannotBeDeletedWhenHasPostsAsync(id, cancellationToken);

    _categoryRepository.Delete(category);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Kategori başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  private static Expression<Func<Category, bool>> BuildAdminListFilter(
    CategoryAdminListQueryRequest query)
  {
    string? search = query.Search?.Trim();
    bool? isActive = query.IsActive;

    return category =>
      (!isActive.HasValue || category.IsActive == isActive.Value) &&
      (string.IsNullOrEmpty(search) ||
       category.Name.Contains(search) ||
       (category.Description != null && category.Description.Contains(search)));
  }
}
