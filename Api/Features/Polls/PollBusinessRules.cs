using Api.Core.Exceptions;

namespace Api.Features.Polls;

public class PollBusinessRules(IPollRepository _pollRepository)
{
  public async Task<Poll> GetPollIfExistAsync(
    int id,
    Func<IQueryable<Poll>, IQueryable<Poll>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Poll? poll = await _pollRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (poll == null)
    {
      throw new NotFoundException($"{id} numaralı anket bulunamadı.");
    }

    return poll;
  }

  public void PollMustBeActive(Poll poll)
  {
    if (!poll.IsActive)
    {
      throw new BusinessException("Bu anket artık aktif değil.");
    }
  }

  public void OptionMustBelongToPoll(Poll poll, int optionId)
  {
    bool exists = poll.Options.Any(o => o.Id == optionId);

    if (!exists)
    {
      throw new BusinessException("Seçenek bu ankete ait değil.");
    }
  }

  public void AdminRoleRequired(string userRole)
  {
    if (userRole != "Admin")
    {
      throw new ForbiddenException("Anket işlemleri için yetkiniz bulunmamaktadır.");
    }
  }

  public async Task PlayerPollMustBeUniqueWhenActiveAsync(
    int playerId,
    int? excludePollId = null,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _pollRepository.AnyAsync(
      p => p.PlayerId == playerId &&
           p.IsActive &&
           (!excludePollId.HasValue || p.Id != excludePollId.Value),
      cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu oyuncu için zaten aktif bir anket var.");
    }
  }

  public async Task GlobalPollMustBeUniqueWhenActiveAsync(
    int? excludePollId = null,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _pollRepository.AnyAsync(
      p => p.PlayerId == null &&
           p.IsActive &&
           (!excludePollId.HasValue || p.Id != excludePollId.Value),
      cancellationToken);

    if (exists)
    {
      throw new BusinessException("Zaten aktif bir global anket var.");
    }
  }
}
