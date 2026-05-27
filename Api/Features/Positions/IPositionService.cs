using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Positions;

public interface IPositionService
{
  Task<ReturnModel<PagedResponse<PositionResponseDto>>> GetAllAsync(
    Expression<Func<Position, bool>>? filter = null,
    Func<IQueryable<Position>, IQueryable<Position>>? include = null,
    Func<IQueryable<Position>, IOrderedQueryable<Position>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PositionResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Position>, IQueryable<Position>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PositionResponseDto>> AddAsync(
    CreatePositionRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdatePositionRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default);
}