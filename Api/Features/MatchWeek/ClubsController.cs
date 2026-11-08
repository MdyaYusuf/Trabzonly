using Api.Core.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.MatchWeek;

[ApiController]
[Route("api/clubs")]
public class ClubsController(IClubService _clubService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(CancellationToken cancellationToken = default)
  {
    var result = await _clubService.GetAllAsync(cancellationToken);

    return CreateActionResult(result);
  }
}
