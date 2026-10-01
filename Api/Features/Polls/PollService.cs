using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Polls;

public class PollService(
  IPollRepository _pollRepository,
  IPollVoteRepository _pollVoteRepository,
  PollBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreatePollRequest> _createValidator,
  IValidator<UpdatePollRequest> _updateValidator,
  IValidator<VotePollRequest> _voteValidator) : IPollService
{
  public async Task<ReturnModel<PollResponseDto?>> GetActiveAsync(
    int? playerId,
    Guid? currentUserId = null,
    CancellationToken cancellationToken = default)
  {
    Poll? poll = await _pollRepository.GetAsync(
      predicate: p => p.IsActive && p.PlayerId == playerId,
      include: query => query.Include(p => p.Options),
      enableTracking: false,
      cancellationToken: cancellationToken);

    if (poll == null)
    {
      return new ReturnModel<PollResponseDto?>()
      {
        Success = true,
        Message = "Aktif anket bulunamadı.",
        Data = null,
        StatusCode = 200
      };
    }

    int? currentUserOptionId = null;

    if (currentUserId.HasValue)
    {
      PollVote? vote = await _pollVoteRepository.GetAsync(
        predicate: v => v.PollId == poll.Id && v.UserId == currentUserId.Value,
        enableTracking: false,
        cancellationToken: cancellationToken);

      currentUserOptionId = vote?.PollOptionId;
    }

    return new ReturnModel<PollResponseDto?>()
    {
      Success = true,
      Message = "Aktif anket başarılı bir şekilde getirildi.",
      Data = MapToResponse(poll, currentUserOptionId),
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedPollResponseDto>> AddAsync(
    CreatePollRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.AdminRoleRequired(userRole);

    if (request.IsActive)
    {
      if (request.PlayerId.HasValue)
      {
        await _businessRules.PlayerPollMustBeUniqueWhenActiveAsync(
          request.PlayerId.Value,
          cancellationToken: cancellationToken);
      }
      else
      {
        await _businessRules.GlobalPollMustBeUniqueWhenActiveAsync(cancellationToken: cancellationToken);
      }
    }

    var poll = new Poll
    {
      Question = request.Question.Trim(),
      PlayerId = request.PlayerId,
      IsActive = request.IsActive,
      Options = request.Options
        .OrderBy(o => o.SortOrder)
        .Select(o => new PollOption
        {
          Label = o.Label.Trim(),
          SortOrder = o.SortOrder,
          VoteCount = 0
        })
        .ToList()
    };

    await _pollRepository.AddAsync(poll, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<CreatedPollResponseDto>()
    {
      Success = true,
      Message = "Anket başarılı bir şekilde eklendi.",
      Data = new CreatedPollResponseDto(poll.Id, poll.Question, poll.IsActive, poll.PlayerId),
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdatePollRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.AdminRoleRequired(userRole);

    Poll poll = await _businessRules.GetPollIfExistAsync(
      request.Id,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (request.IsActive && !poll.IsActive)
    {
      if (poll.PlayerId.HasValue)
      {
        await _businessRules.PlayerPollMustBeUniqueWhenActiveAsync(
          poll.PlayerId.Value,
          excludePollId: poll.Id,
          cancellationToken: cancellationToken);
      }
      else
      {
        await _businessRules.GlobalPollMustBeUniqueWhenActiveAsync(
          excludePollId: poll.Id,
          cancellationToken: cancellationToken);
      }
    }

    poll.Question = request.Question.Trim();
    poll.IsActive = request.IsActive;

    _pollRepository.Update(poll);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Anket başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PollResponseDto>> VoteAsync(
    int pollId,
    VotePollRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _voteValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Poll poll = await _businessRules.GetPollIfExistAsync(
      pollId,
      include: query => query.Include(p => p.Options),
      enableTracking: true,
      cancellationToken: cancellationToken);

    _businessRules.PollMustBeActive(poll);
    _businessRules.OptionMustBelongToPoll(poll, request.OptionId);

    PollVote? existingVote = await _pollVoteRepository.GetAsync(
      predicate: v => v.PollId == pollId && v.UserId == currentUserId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (existingVote == null)
    {
      await _pollVoteRepository.AddAsync(
        new PollVote
        {
          PollId = pollId,
          UserId = currentUserId,
          PollOptionId = request.OptionId
        },
        cancellationToken);

      PollOption selected = poll.Options.First(o => o.Id == request.OptionId);
      selected.VoteCount++;
    }
    else if (existingVote.PollOptionId != request.OptionId)
    {
      PollOption previous = poll.Options.First(o => o.Id == existingVote.PollOptionId);
      PollOption selected = poll.Options.First(o => o.Id == request.OptionId);

      previous.VoteCount = Math.Max(0, previous.VoteCount - 1);
      selected.VoteCount++;
      existingVote.PollOptionId = request.OptionId;
      _pollVoteRepository.Update(existingVote);
    }

    _pollRepository.Update(poll);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<PollResponseDto>()
    {
      Success = true,
      Message = "Oyunuz kaydedildi.",
      Data = MapToResponse(poll, request.OptionId),
      StatusCode = 200
    };
  }

  private static PollResponseDto MapToResponse(Poll poll, int? currentUserOptionId)
  {
    int totalVotes = poll.Options.Sum(o => o.VoteCount);

    List<PollOptionResponseDto> options = poll.Options
      .OrderBy(o => o.SortOrder)
      .ThenBy(o => o.Id)
      .Select(o =>
      {
        double percentage = totalVotes == 0
          ? 0
          : Math.Round(o.VoteCount * 100.0 / totalVotes, 1);

        return new PollOptionResponseDto(
          o.Id,
          o.Label,
          o.SortOrder,
          o.VoteCount,
          percentage);
      })
      .ToList();

    return new PollResponseDto(
      poll.Id,
      poll.Question,
      poll.IsActive,
      poll.PlayerId,
      totalVotes,
      currentUserOptionId,
      options);
  }
}
