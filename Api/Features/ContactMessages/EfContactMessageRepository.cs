using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.ContactMessages;

public class EfContactMessageRepository : EfBaseRepository<BaseDbContext, ContactMessage, int>, IContactMessageRepository
{
  public EfContactMessageRepository(BaseDbContext context) : base(context)
  {
  }
}
