using Api.Core.Exceptions;
using Api.Features.Users;

namespace Api.Features.Roles;

public class RoleBusinessRules(
  IRoleRepository _roleRepository,
  IUserRepository _userRepository)
{
  public const string AdminRoleName = "Admin";

  public async Task<Role> GetRoleIfExistAsync(
    int id,
    Func<IQueryable<Role>, IQueryable<Role>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var role = await _roleRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (role == null)
    {
      throw new NotFoundException($"{id} numaralı rol bulunamadı.");
    }

    return role;
  }

  public async Task NameMustBeUniqueAsync(string name, CancellationToken cancellationToken = default)
  {
    var exists = await _roleRepository.AnyAsync(x => x.Name == name, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Rol için benzersiz bir isim kullanılmalıdır.");
    }
  }

  public void AdminRoleRequired(string userRole)
  {
    if (userRole != AdminRoleName)
    {
      throw new ForbiddenException("Rol işlemleri için yetkiniz bulunmamaktadır.");
    }
  }

  public async Task RoleNameCannotBeDuplicatedWhenUpdatedAsync(
    int id,
    string name,
    CancellationToken cancellationToken = default)
  {
    var exists = await _roleRepository.AnyAsync(x => x.Id != id && x.Name == name, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Rol için benzersiz bir isim kullanılmalıdır.");
    }
  }

  public void SystemRolesCannotBeModifiedOrDeleted(Role role)
  {
    if (role.IsSystem)
    {
      throw new BusinessException("Sistem rollerinde değişiklik yapılamaz veya silinemez.");
    }
  }

  public async Task RoleCannotBeDeletedWhenHasUsersAsync(
    int roleId,
    CancellationToken cancellationToken = default)
  {
    bool hasUsers = await _userRepository.AnyAsync(
      user => user.RoleId == roleId,
      cancellationToken);

    if (hasUsers)
    {
      throw new BusinessException(
        "Bu role bağlı üyeler varken silinemez. Önce üyeleri başka bir role taşıyın.");
    }
  }
}
