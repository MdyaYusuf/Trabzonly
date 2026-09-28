using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Metrics;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class MetricsController(IMetricsService _metricsService) : CustomBaseController
{
  [HttpGet("shell")]
  public async Task<IActionResult> GetShellMetrics(CancellationToken cancellationToken)
  {
    var result = await _metricsService.GetShellMetricsAsync(cancellationToken);

    return CreateActionResult(result);
  }
}
