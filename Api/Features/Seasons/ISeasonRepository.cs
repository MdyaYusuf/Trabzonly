using Api.Core.Repositories;

namespace Api.Features.Seasons;

public interface ISeasonRepository : IRepository<Season, Guid>
{

}