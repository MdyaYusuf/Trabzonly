using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Players;

public interface IPlayerService
{
  Task<ReturnModel<List<PlayerResponseDto>>> GetAllAsync(
    Expression<Func<Player, bool>>? filter = null,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    Func<IQueryable<Player>, IOrderedQueryable<Player>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PlayerResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<List<PlayerResponseDto>>> GetTopValuedPlayersAsync(
    int count,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<List<PlayerResponseDto>>> GetMostCommentedPlayersAsync(
    int count,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedPlayerResponseDto>> AddAsync(
    CreatePlayerRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdatePlayerRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default);
}