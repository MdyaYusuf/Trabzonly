using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Polls;

public class PollService(
  IPollRepository _pollRepository,
  IPollOptionRepository _pollOptionRepository,
  IPollVoteRepository _pollVoteRepository,
  PollBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreatePollRequest> _createValidator,
  IValidator<UpdatePollRequest> _updateValidator,
  IValidator<VotePollRequest> _voteValidator) : IPollService
{
  public async Task<ReturnModel<PollResponseDto?>> GetActiveAsync(
    int? playerId = null,
    Guid? postId = null,
    Guid? currentUserId = null,
    CancellationToken cancellationToken = default)
  {
    _businessRules.PollScopeMustBeValid(playerId, postId);

    Poll? poll = await _pollRepository.GetAsync(
      predicate: p =>
        p.IsActive &&
        p.PlayerId == playerId &&
        p.PostId == postId,
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

  public async Task<ReturnModel<PagedResponse<PollAdminListItemDto>>> GetAdminListAsync(
    PollAdminListQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    int pageNumber = query.PageNumber < 1 ? 1 : query.PageNumber;
    int pageSize = query.PageSize < 1 ? 10 : Math.Min(query.PageSize, 100);

    var (polls, totalCount) = await _pollRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter: BuildAdminListFilter(query),
      include: q => q
        .Include(p => p.Options)
        .Include(p => p.Player)
        .Include(p => p.Post),
      orderBy: BuildAdminListOrderBy(query.Sort),
      enableTracking: false,
      cancellationToken: cancellationToken);

    List<PollAdminListItemDto> items = polls
      .Select(MapToAdminListItem)
      .ToList();

    var pagedResponse = new PagedResponse<PollAdminListItemDto>(
      items,
      totalCount,
      pageNumber,
      pageSize);

    return new ReturnModel<PagedResponse<PollAdminListItemDto>>()
    {
      Success = true,
      Message = "Anket yönetim listesi başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PollAdminDetailDto>> GetAdminByIdAsync(
    int id,
    CancellationToken cancellationToken = default)
  {
    Poll poll = await _businessRules.GetPollIfExistAsync(
      id,
      include: query => query
        .Include(p => p.Options)
        .Include(p => p.Player)
        .Include(p => p.Post),
      enableTracking: false,
      cancellationToken: cancellationToken);

    return new ReturnModel<PollAdminDetailDto>()
    {
      Success = true,
      Message = $"{id} numaralı anket başarılı bir şekilde getirildi.",
      Data = MapToAdminDetail(poll),
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
    _businessRules.PollScopeMustBeValid(request.PlayerId, request.PostId);
    _businessRules.AdminCreateScopeMustNotBePost(request.PostId);

    if (request.IsActive)
    {
      await _businessRules.DeactivateOthersInScopeAsync(
        request.PlayerId,
        request.PostId,
        excludePollId: null,
        cancellationToken);
    }

    var poll = new Poll
    {
      Question = request.Question.Trim(),
      PlayerId = request.PlayerId,
      PostId = request.PostId,
      IsActive = request.IsActive,
      Options = request.Options
        .OrderBy(o => o.SortOrder)
        .Select((o, index) => new PollOption
        {
          Label = o.Label.Trim(),
          SortOrder = o.SortOrder > 0 ? o.SortOrder : index + 1,
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
      Data = new CreatedPollResponseDto(
        poll.Id,
        poll.Question,
        poll.IsActive,
        poll.PlayerId,
        poll.PostId),
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
      include: query => query.Include(p => p.Options),
      enableTracking: true,
      cancellationToken: cancellationToken);

    int totalVotes = poll.Options.Sum(o => o.VoteCount);
    bool hasVotes = totalVotes > 0;
    bool optionsProvided = request.Options != null;

    _businessRules.OptionsMustRemainUnchangedWhenVotesExist(hasVotes, optionsProvided);

    if (request.IsActive && !poll.IsActive)
    {
      await _businessRules.DeactivateOthersInScopeAsync(
        poll.PlayerId,
        poll.PostId,
        excludePollId: poll.Id,
        cancellationToken);
    }

    poll.Question = request.Question.Trim();
    poll.IsActive = request.IsActive;

    if (optionsProvided && !hasVotes)
    {
      List<PollOption> existingOptions = poll.Options.ToList();

      if (existingOptions.Count > 0)
      {
        _pollOptionRepository.DeleteRange(existingOptions);
      }

      poll.Options = request.Options!
        .OrderBy(o => o.SortOrder)
        .Select((o, index) => new PollOption
        {
          Label = o.Label.Trim(),
          SortOrder = o.SortOrder > 0 ? o.SortOrder : index + 1,
          VoteCount = 0,
          PollId = poll.Id
        })
        .ToList();
    }

    _pollRepository.Update(poll);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Anket başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> DeactivateAsync(
    int id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    Poll poll = await _businessRules.GetPollIfExistAsync(
      id,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (!poll.IsActive)
    {
      return new ReturnModel<NoData>()
      {
        Success = true,
        Message = "Anket zaten pasif.",
        StatusCode = 200
      };
    }

    poll.IsActive = false;
    _pollRepository.Update(poll);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Anket pasifleştirildi.",
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

  private static Expression<Func<Poll, bool>>? BuildAdminListFilter(PollAdminListQueryRequest query)
  {
    string? search = query.Search?.Trim();
    bool? isActive = query.IsActive;
    string? scope = query.Scope?.Trim().ToLowerInvariant();

    if (string.IsNullOrWhiteSpace(search) && isActive == null && string.IsNullOrWhiteSpace(scope))
    {
      return null;
    }

    return p =>
      (isActive == null || p.IsActive == isActive.Value) &&
      (string.IsNullOrWhiteSpace(scope) ||
        (scope == "global" && p.PlayerId == null && p.PostId == null) ||
        (scope == "player" && p.PlayerId != null) ||
        (scope == "post" && p.PostId != null)) &&
      (string.IsNullOrWhiteSpace(search) ||
        p.Question.Contains(search) ||
        (p.Player != null && p.Player.Name.Contains(search)) ||
        (p.Post != null && p.Post.Title.Contains(search)));
  }

  private static Func<IQueryable<Poll>, IOrderedQueryable<Poll>> BuildAdminListOrderBy(string? sort)
  {
    return (sort ?? "newest").Trim().ToLowerInvariant() switch
    {
      "oldest" => q => q.OrderBy(p => p.CreatedDate).ThenBy(p => p.Id),
      "votes-desc" => q => q
        .OrderByDescending(p => p.Options.Sum(o => o.VoteCount))
        .ThenByDescending(p => p.Id),
      "votes-asc" => q => q
        .OrderBy(p => p.Options.Sum(o => o.VoteCount))
        .ThenBy(p => p.Id),
      _ => q => q.OrderByDescending(p => p.CreatedDate).ThenByDescending(p => p.Id)
    };
  }

  private static string ResolveScope(Poll poll)
  {
    if (poll.PlayerId.HasValue)
    {
      return "player";
    }

    if (poll.PostId.HasValue)
    {
      return "post";
    }

    return "global";
  }

  private static PollAdminListItemDto MapToAdminListItem(Poll poll)
  {
    int totalVotes = poll.Options.Sum(o => o.VoteCount);

    return new PollAdminListItemDto(
      poll.Id,
      poll.Question,
      poll.IsActive,
      ResolveScope(poll),
      poll.PlayerId,
      poll.Player?.Name,
      poll.PostId,
      poll.Post?.Title,
      poll.Options.Count,
      totalVotes,
      poll.CreatedDate,
      poll.UpdatedDate);
  }

  private static PollAdminDetailDto MapToAdminDetail(Poll poll)
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

    return new PollAdminDetailDto(
      poll.Id,
      poll.Question,
      poll.IsActive,
      ResolveScope(poll),
      poll.PlayerId,
      poll.Player?.Name,
      poll.PostId,
      poll.Post?.Title,
      totalVotes,
      OptionsLocked: totalVotes > 0,
      poll.CreatedDate,
      poll.UpdatedDate,
      options);
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
      poll.PostId,
      totalVotes,
      currentUserOptionId,
      options);
  }
}
