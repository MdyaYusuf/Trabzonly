using Api.Core.Repositories;

namespace Api.Features.Positions;

public interface IPositionRepository : IRepository<Position, Guid>
{

}