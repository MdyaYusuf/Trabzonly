using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Players;

public interface IPlayerService
{
  Task<ReturnModel<PagedResponse<PlayerResponseDto>>> GetAllAsync(
    Expression<Func<Player, bool>>? filter = null,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    Func<IQueryable<Player>, IOrderedQueryable<Player>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PagedResponse<PlayerResponseDto>>> GetRosterAsync(
    PlayerListQueryRequest query,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PlayerRosterOverviewDto>> GetRosterOverviewAsync(
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PlayerResponseDto>> GetByIdAsync(
    int id,
    Guid? currentUserId = null,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CursorPagedResponse<PlayerResponseDto>>> GetTopValuedPlayersAsync(
    int count,
    decimal? lastValueCursor = null,
    int? lastIdCursor = null,
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

  Task<ReturnModel<List<PlayerResponseDto>>> GetTopRatedPlayersAsync(
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
    int id,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PlayerRatingResponseDto>> RateAsync(
    int playerId,
    RatePlayerRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default);
}
