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
}