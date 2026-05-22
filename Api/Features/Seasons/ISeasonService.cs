using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Seasons;

public interface ISeasonService
{
  Task<ReturnModel<List<SeasonResponseDto>>> GetAllAsync(
    Expression<Func<Season, bool>>? filter = null,
    Func<IQueryable<Season>, IQueryable<Season>>? include = null,
    Func<IQueryable<Season>, IOrderedQueryable<Season>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<SeasonResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Season>, IQueryable<Season>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<SeasonResponseDto>> AddAsync(
    CreateSeasonRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateSeasonRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default);
}