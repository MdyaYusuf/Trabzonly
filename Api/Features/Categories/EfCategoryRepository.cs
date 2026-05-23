using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Categories;

public class EfCategoryRepository : EfBaseRepository<BaseDbContext, Category, int>, ICategoryRepository
{
  public EfCategoryRepository(BaseDbContext context) : base(context)
  {

  }
}