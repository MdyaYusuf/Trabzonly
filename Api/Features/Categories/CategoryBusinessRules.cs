using Api.Core.Exceptions;

namespace Api.Features.Categories;

public class CategoryBusinessRules(ICategoryRepository _categoryRepository)
{
  public async Task<Category> GetCategoryIfExistAsync(
    int id,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var category = await _categoryRepository.GetByIdAsync(id, enableTracking: enableTracking, cancellationToken: cancellationToken);

    if (category == null)
    {
      throw new NotFoundException($"{id} numaralı kategori bulunamadı.");
    }

    return category;
  }
}