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
  public async Task<ReturnModel<List<CategoryResponseDto>>> GetAllAsync(
    Expression<Func<Category, bool>>? filter = null,
    Func<IQueryable<Category>, IOrderedQueryable<Category>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Category> categories = await _categoryRepository.GetAllAsync(
      filter,
      include: null,
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    List<CategoryResponseDto> response = _mapper.EntityToResponseDtoList(categories);

    return new ReturnModel<List<CategoryResponseDto>>()
    {
      Success = true,
      Message = "Kategori listesi başarılı bir şekilde getirildi.",
      Data = response,
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

    Category category = _mapper.CreateToEntity(request);

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

    _categoryRepository.Delete(category);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Kategori başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }
}