using Api.Core.Repositories;

namespace Api.Features.Players;

public interface IPlayerRepository : IRepository<Player, Guid>
{

}