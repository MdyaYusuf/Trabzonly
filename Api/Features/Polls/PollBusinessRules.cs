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

  public void PollScopeMustBeValid(int? playerId, Guid? postId)
  {
    if (playerId.HasValue && postId.HasValue)
    {
      throw new BusinessException("Anket hem oyuncuya hem gönderiye bağlanamaz.");
    }
  }

  public void AdminCreateScopeMustNotBePost(Guid? postId)
  {
    if (postId.HasValue)
    {
      throw new BusinessException("Yönetim panelinden gönderi anketi oluşturulamaz.");
    }
  }

  public void OptionsMustRemainUnchangedWhenVotesExist(bool hasVotes, bool optionsProvided)
  {
    if (hasVotes && optionsProvided)
    {
      throw new BusinessException("Oy alan anketlerin seçenekleri değiştirilemez.");
    }
  }

  public async Task DeactivateOthersInScopeAsync(
    int? playerId,
    Guid? postId,
    int? excludePollId,
    CancellationToken cancellationToken = default)
  {
    List<Poll> activePeers = await _pollRepository.GetAllAsync(
      filter: p =>
        p.IsActive &&
        p.PlayerId == playerId &&
        p.PostId == postId &&
        (!excludePollId.HasValue || p.Id != excludePollId.Value),
      enableTracking: true,
      cancellationToken: cancellationToken);

    foreach (Poll peer in activePeers)
    {
      peer.IsActive = false;
      _pollRepository.Update(peer);
    }
  }
}
