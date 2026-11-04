using Api.Core.Controllers;
using Api.Core.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Roles;

[Authorize]
[ApiController]
[Route("api/roles")]
public class RolesController(IRoleService _roleService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(
    [FromQuery] PaginationRequest pagination,
    CancellationToken cancellationToken = default)
  {
    var result = await _roleService.GetAllAsync(
      userRole: GetUserRole(),
      pageNumber: pagination.PageNumber,
      pageSize: pagination.PageSize,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet("manage")]
  public async Task<IActionResult> GetAllForAdmin(
    [FromQuery] RoleAdminListQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    var result = await _roleService.GetAdminListAsync(
      query: query,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet("manage/summary")]
  public async Task<IActionResult> GetAdminSummary(
    CancellationToken cancellationToken = default)
  {
    var result = await _roleService.GetAdminSummaryAsync(cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:int}")]
  public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
  {
    var result = await _roleService.GetByIdAsync(
      id: id,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Add([FromBody] CreateRoleRequest request, CancellationToken cancellationToken)
  {
    var result = await _roleService.AddAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPut]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Update([FromBody] UpdateRoleRequest request, CancellationToken cancellationToken)
  {
    var result = await _roleService.UpdateAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpDelete("{id:int}")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
  {
    var result = await _roleService.RemoveAsync(
      id: id,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}