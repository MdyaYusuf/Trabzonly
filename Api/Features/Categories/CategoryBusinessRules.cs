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

  public async Task CategoryNameMustBeUniqueAsync(
    string name,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _categoryRepository.AnyAsync(c => c.Name == name, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu ada sahip bir kategori zaten mevcut. Lütfen farklı bir kategori adı seçiniz.");
    }
  }

  public async Task CategoryNameCannotBeDuplicatedWhenUpdated(int id, string name, CancellationToken cancellationToken = default)
  {
    bool exists = await _categoryRepository.AnyAsync(c => c.Id != id && c.Name == name, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu ada sahip bir kategori zaten mevcut. Lütfen farklı bir kategori adı seçiniz.");
    }
  }
}