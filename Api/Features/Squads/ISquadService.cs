using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Squads;

public interface ISquadService
{
  Task<ReturnModel<PagedResponse<SquadPreviewDto>>> GetAllAsync(
    Expression<Func<Squad, bool>>? filter = null,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    Func<IQueryable<Squad>, IOrderedQueryable<Squad>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<SquadResponseDto>> GetByIdAsync(
    Guid id,
    Guid? currentUserId = null,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CursorPagedResponse<SquadPreviewDto>>> GetRecentSquadsAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<List<SquadPreviewDto>>> GetTopRatedSquadsAsync(
    int count,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<List<SquadPreviewDto>>> GetByUserIdAsync(
    Guid userId,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedSquadResponseDto>> AddAsync(
    CreateSquadRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateSquadRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<SquadRatingResponseDto>> RateAsync(
    Guid squadId,
    RateSquadRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default);
}
