using System.Linq.Expressions;
using Api.Core.Helpers;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Players;

public class PlayerService(
  IPlayerRepository _playerRepository,
  PlayerMapper _mapper,
  PlayerBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreatePlayerRequest> _createValidator,
  IValidator<UpdatePlayerRequest> _updateValidator) : IPlayerService
{
  public async Task<ReturnModel<List<PlayerResponseDto>>> GetAllAsync(
    Expression<Func<Player, bool>>? filter = null,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    Func<IQueryable<Player>, IOrderedQueryable<Player>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Player> players = await _playerRepository.GetAllAsync(
      filter,
      include: include ?? (query => query.Include(p => p.Position)),
      orderBy: orderBy ?? (query => query.OrderBy(p => p.Name)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PlayerResponseDto> response = _mapper.EntityToResponseDtoList(players);

    return new ReturnModel<List<PlayerResponseDto>>()
    {
      Success = true,
      Message = "Oyuncu listesi başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PlayerResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Player player = await _businessRules.GetPlayerIfExistAsync(
      id,
      include: include ?? (query => query.Include(p => p.Position)),
      enableTracking,
      cancellationToken);

    PlayerResponseDto response = _mapper.EntityToResponseDto(player);

    return new ReturnModel<PlayerResponseDto>()
    {
      Success = true,
      Message = "Oyuncu başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<PlayerResponseDto>>> GetTopValuedPlayersAsync(
    int count,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Player> players = await _playerRepository.GetTopValuedPlayersAsync(
      count,
      include: include ?? (query => query.Include(p => p.Position)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PlayerResponseDto> response = _mapper.EntityToResponseDtoList(players);

    return new ReturnModel<List<PlayerResponseDto>>()
    {
      Success = true,
      Message = "En değerli oyuncular başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<PlayerResponseDto>>> GetMostCommentedPlayersAsync(
    int count,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Player> players = await _playerRepository.GetMostCommentedPlayersAsync(
      count,
      include: include ?? (query => query.Include(p => p.Position)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PlayerResponseDto> response = _mapper.EntityToResponseDtoList(players);

    return new ReturnModel<List<PlayerResponseDto>>()
    {
      Success = true,
      Message = "En çok konuşulan oyuncular başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedPlayerResponseDto>> AddAsync(
    CreatePlayerRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Player player = _mapper.CreateToEntity(request);

    if (request.ImageFile != null)
    {
      player.ImageUrl = await FileHelper.SaveImageToDisk(request.ImageFile, "players", request.Name, cancellationToken);
    }

    await _playerRepository.AddAsync(player, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedPlayerResponseDto response = _mapper.EntityToCreatedResponseDto(player);

    return new ReturnModel<CreatedPlayerResponseDto>()
    {
      Success = true,
      Message = "Oyuncu başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdatePlayerRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Player player = await _businessRules.GetPlayerIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    player.ImageUrl = await FileHelper.ReplaceImageOnDisk(
      request.ImageFile, player.ImageUrl, "players", request.Name, cancellationToken);

    _mapper.UpdateEntityFromRequest(request, player);

    _playerRepository.Update(player);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Oyuncu başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    Player player = await _businessRules.GetPlayerIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    FileHelper.DeleteImageFromDisk(player.ImageUrl);

    _playerRepository.Delete(player);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Oyuncu başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }
}