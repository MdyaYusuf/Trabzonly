using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Categories;

public class EfCategoryRepository : EfBaseRepository<BaseDbContext, Category, int>, ICategoryRepository
{
  public EfCategoryRepository(BaseDbContext context) : base(context)
  {
  }

  public async Task<List<CategoryAdminListItemDto>> GetAdminListAsync(
    Expression<Func<Category, bool>>? filter = null,
    string? sort = null,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Category> query = _context.Set<Category>().AsNoTracking();

    if (filter != null)
    {
      query = query.Where(filter);
    }

    query = ApplyAdminSort(query, sort);

    return await query
      .Select(category => new CategoryAdminListItemDto(
        category.Id,
        category.Name,
        category.Description,
        category.IsActive,
        category.Posts.Count,
        category.CreatedDate,
        category.UpdatedDate))
      .ToListAsync(cancellationToken);
  }

  private static IQueryable<Category> ApplyAdminSort(
    IQueryable<Category> query,
    string? sort)
  {
    string normalized = sort?.Trim().ToLowerInvariant() ?? CategorySortOptions.NameAsc;

    return normalized switch
    {
      CategorySortOptions.PostsAsc => query
        .OrderBy(category => category.Posts.Count)
        .ThenBy(category => category.Name),
      CategorySortOptions.PostsDesc => query
        .OrderByDescending(category => category.Posts.Count)
        .ThenBy(category => category.Name),
      _ => query
        .OrderBy(category => category.Name)
        .ThenBy(category => category.Id)
    };
  }
}
