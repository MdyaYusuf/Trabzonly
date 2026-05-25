using Api.Core.Exceptions;

namespace Api.Features.Players;

public class PlayerBusinessRules(IPlayerRepository _playerRepository)
{
  public async Task<Player> GetPlayerIfExistAsync(
    Guid id,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var player = await _playerRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (player == null)
    {
      throw new NotFoundException($"{id} numaralı oyuncu bulunamadı.");
    }

    return player;
  }

  public void AdminRoleRequired(string userRole)
  {
    if (userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public async Task PlayerCannotBeDuplicatedAsync(
    string name,
    DateTime dateOfBirth,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _playerRepository.AnyAsync(
      p => p.Name == name && p.DateOfBirth == dateOfBirth, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu isim ve doğum tarihine sahip bir oyuncu zaten sistemde kayıtlı.");
    }
  }

  public async Task PlayerCannotBeDuplicatedWhenUpdatedAsync(
    Guid id, string name, DateTime dateOfBirth, CancellationToken cancellationToken = default)
  {
    bool exists = await _playerRepository.AnyAsync(
      p => p.Id != id && p.Name == name && p.DateOfBirth == dateOfBirth, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu isim ve doğum tarihine sahip başka bir oyuncu sistemde zaten kayıtlı.");
    }
  }
}