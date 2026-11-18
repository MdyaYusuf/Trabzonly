using Api.Core.Repositories;

namespace Api.Features.ContactMessages;

public interface IContactMessageRepository : IRepository<ContactMessage, int>
{
}
