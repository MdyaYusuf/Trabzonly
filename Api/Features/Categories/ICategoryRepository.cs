using System.Linq.Expressions;
using Api.Core.Repositories;

namespace Api.Features.Categories;

public interface ICategoryRepository : IRepository<Category, int>
{
  Task<List<CategoryAdminListItemDto>> GetAdminListAsync(
    Expression<Func<Category, bool>>? filter = null,
    string? sort = null,
    CancellationToken cancellationToken = default);
}
