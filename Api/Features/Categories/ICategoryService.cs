using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Categories;

public interface ICategoryService
{
  Task<ReturnModel<List<CategoryResponseDto>>> GetAllAsync(
    Expression<Func<Category, bool>>? filter = null,
    Func<IQueryable<Category>, IOrderedQueryable<Category>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CategoryResponseDto>> GetByIdAsync(
    int id,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CategoryResponseDto>> AddAsync(
    CreateCategoryRequest request,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateCategoryRequest request,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    int id,
    CancellationToken cancellationToken = default);
}