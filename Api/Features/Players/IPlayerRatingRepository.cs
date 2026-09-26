using Api.Core.Repositories;

namespace Api.Features.Players;

public interface IPlayerRatingRepository : IRepository<PlayerRating, Guid>
{
}
