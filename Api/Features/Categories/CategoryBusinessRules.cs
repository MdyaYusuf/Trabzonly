using Api.Core.Exceptions;
using Api.Features.Posts;

namespace Api.Features.Categories;

public class CategoryBusinessRules(
  ICategoryRepository _categoryRepository,
  IPostRepository _postRepository)
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

  public async Task CategoryNameCannotBeDuplicatedWhenUpdated(
    int id,
    string name,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _categoryRepository.AnyAsync(c => c.Id != id && c.Name == name, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu ada sahip bir kategori zaten mevcut. Lütfen farklı bir kategori adı seçiniz.");
    }
  }

  public async Task CategoryCannotBeDeletedWhenHasPostsAsync(
    int categoryId,
    CancellationToken cancellationToken = default)
  {
    bool hasPosts = await _postRepository.AnyAsync(p => p.CategoryId == categoryId, cancellationToken);

    if (hasPosts)
    {
      throw new BusinessException(
        "Bu kategoriye bağlı gönderiler varken silinemez. Önce gönderileri başka bir kategoriye taşıyın.");
    }
  }
}
