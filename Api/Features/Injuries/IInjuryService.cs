using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Injuries;

public interface IInjuryService
{
  Task<ReturnModel<List<InjuryResponseDto>>> GetAllAsync(
    Expression<Func<Injury, bool>>? filter = null,
    Func<IQueryable<Injury>, IQueryable<Injury>>? include = null,
    Func<IQueryable<Injury>, IOrderedQueryable<Injury>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<InjuryResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Injury>, IQueryable<Injury>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<InjuryResponseDto>> AddAsync(
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