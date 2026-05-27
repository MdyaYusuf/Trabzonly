using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Injuries;

public interface IInjuryService
{
  Task<ReturnModel<PagedResponse<InjuryResponseDto>>> GetAllAsync(
    Expression<Func<Injury, bool>>? filter = null,
    Func<IQueryable<Injury>, IQueryable<Injury>>? include = null,
    Func<IQueryable<Injury>, IOrderedQueryable<Injury>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<InjuryResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Injury>, IQueryable<Injury>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedInjuryResponseDto>> AddAsync(
    CreateInjuryRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateInjuryRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default);
}