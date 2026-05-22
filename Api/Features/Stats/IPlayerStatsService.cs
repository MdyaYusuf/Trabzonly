using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Stats;

public interface IPlayerStatsService
{
  Task<ReturnModel<List<PlayerStatsResponseDto>>> GetAllAsync(
    Expression<Func<PlayerStats, bool>>? filter = null,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    Func<IQueryable<PlayerStats>, IOrderedQueryable<PlayerStats>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PlayerStatsResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PlayerStatsResponseDto>> AddAsync(
    CreatePlayerStatsRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdatePlayerStatsRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default);
}