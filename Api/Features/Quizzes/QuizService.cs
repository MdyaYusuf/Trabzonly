using System.Linq.Expressions;
using Api.Core.Exceptions;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Quizzes;

public class QuizService(
  IQuizRepository _quizRepository,
  IUserQuizResultRepository _userQuizResultRepository,
  QuizMapper _mapper,
  QuizBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreateQuizRequest> _createValidator,
  IValidator<UpdateQuizRequest> _updateValidator,
  IValidator<SubmitQuizRequest> _submitValidator,
  IValidator<CheckQuizAnswerRequest> _checkAnswerValidator) : IQuizService
{
  public async Task<ReturnModel<List<QuizListItemDto>>> GetActiveListAsync(
    QuizCategory? category = null,
    string? sort = null,
    CancellationToken cancellationToken = default)
  {
    Expression<Func<Quiz, bool>> filter = category.HasValue
      ? q => q.IsActive && q.Category == category.Value
      : q => q.IsActive;

    List<Quiz> quizzes = await _quizRepository.GetAllAsync(
      filter: filter,
      include: query => query
        .Include(q => q.Questions)
        .Include(q => q.UserQuizResults),
      orderBy: query => query.OrderByDescending(q => q.UserQuizResults.Count).ThenBy(q => q.Title),
      enableTracking: false,
      cancellationToken: cancellationToken);

    List<QuizListItemDto> response = _mapper.EntityToListItemDtoList(quizzes);

    return new ReturnModel<List<QuizListItemDto>>()
    {
      Success = true,
      Message = "Quiz listesi başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<QuizTakeDto>> GetTakeAsync(
    Guid id,
    CancellationToken cancellationToken = default)
  {
    Quiz quiz = await _businessRules.GetQuizIfExistAsync(
      id,
      include: query => query
        .Include(q => q.Questions)
        .ThenInclude(q => q.Answers),
      enableTracking: false,
      cancellationToken: cancellationToken);

    _businessRules.QuizMustBeActive(quiz);

    QuizTakeDto response = _mapper.EntityToTakeDto(quiz);

    return new ReturnModel<QuizTakeDto>()
    {
      Success = true,
      Message = "Quiz çözme içeriği başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<QuizPlatformStatsDto>> GetPlatformStatsAsync(
    CancellationToken cancellationToken = default)
  {
    int totalQuizzes = await _quizRepository.Query(enableTracking: false)
      .CountAsync(q => q.IsActive, cancellationToken);

    List<UserQuizResult> results = await _userQuizResultRepository.GetAllAsync(
      include: query => query.Include(r => r.User),
      enableTracking: false,
      cancellationToken: cancellationToken);

    int totalCompletions = results.Count;
    double averageScore = totalCompletions == 0
      ? 0
      : Math.Round(results.Average(r => (double)r.Score), 2);

    string? topUsername = BuildLeaderboardEntries(
        results,
        take: 1,
        minDistinctQuizzes: QuizBusinessRules.MinDistinctQuizzesForLeaderboard)
      .FirstOrDefault()
      ?.Username;

    var response = new QuizPlatformStatsDto(
      totalQuizzes,
      totalCompletions,
      averageScore,
      topUsername);

    return new ReturnModel<QuizPlatformStatsDto>()
    {
      Success = true,
      Message = "Quiz platform istatistikleri başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<QuizLeaderboardEntryDto>>> GetLeaderboardAsync(
    int take = QuizBusinessRules.DefaultLeaderboardTake,
    CancellationToken cancellationToken = default)
  {
    if (take < 1)
    {
      take = QuizBusinessRules.DefaultLeaderboardTake;
    }

    if (take > QuizBusinessRules.DefaultLeaderboardTake)
    {
      take = QuizBusinessRules.DefaultLeaderboardTake;
    }

    List<UserQuizResult> results = await _userQuizResultRepository.GetAllAsync(
      include: query => query.Include(r => r.User),
      enableTracking: false,
      cancellationToken: cancellationToken);

    List<QuizLeaderboardEntryDto> response = BuildLeaderboardEntries(
      results,
      take: take,
      minDistinctQuizzes: QuizBusinessRules.MinDistinctQuizzesForLeaderboard);

    return new ReturnModel<List<QuizLeaderboardEntryDto>>()
    {
      Success = true,
      Message = "Quiz liderlik tablosu başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<QuizUserStatsDto>> GetMyStatsAsync(
    Guid currentUserId,
    CancellationToken cancellationToken = default)
  {
    List<UserQuizResult> results = await _userQuizResultRepository.GetAllAsync(
      filter: r => r.UserId == currentUserId,
      enableTracking: false,
      cancellationToken: cancellationToken);

    if (results.Count == 0)
    {
      var empty = new QuizUserStatsDto(
        AverageScore: 0,
        AverageCompletionTime: TimeSpan.Zero,
        AttemptsCount: 0,
        DistinctQuizCount: 0);

      return new ReturnModel<QuizUserStatsDto>()
      {
        Success = true,
        Message = "Kullanıcı quiz istatistikleri başarılı bir şekilde getirildi.",
        Data = empty,
        StatusCode = 200
      };
    }

    double averageScore = Math.Round(results.Average(r => (double)r.Score), 2);
    TimeSpan averageCompletionTime = TimeSpan.FromTicks(
      (long)results.Average(r => r.CompletionTime.Ticks));
    int distinctQuizCount = results.Select(r => r.QuizId).Distinct().Count();

    var response = new QuizUserStatsDto(
      averageScore,
      averageCompletionTime,
      results.Count,
      distinctQuizCount);

    return new ReturnModel<QuizUserStatsDto>()
    {
      Success = true,
      Message = "Kullanıcı quiz istatistikleri başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<QuizResponseDto>>> GetAllAsync(
    Expression<Func<Quiz, bool>>? filter = null,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    Func<IQueryable<Quiz>, IOrderedQueryable<Quiz>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Quiz> quizzes = await _quizRepository.GetAllAsync(
      filter,
      include: include ?? (query => query.Include(q => q.Questions).ThenInclude(q => q.Answers)),
      orderBy: orderBy ?? (query => query.OrderBy(q => q.Title)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<QuizResponseDto> response = _mapper.EntityToResponseDtoList(quizzes);

    return new ReturnModel<List<QuizResponseDto>>()
    {
      Success = true,
      Message = "Quiz listesi başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<QuizResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Quiz quiz = await _businessRules.GetQuizIfExistAsync(
      id,
      include: include ?? (query => query.Include(q => q.Questions).ThenInclude(q => q.Answers)),
      enableTracking,
      cancellationToken);

    QuizResponseDto response = _mapper.EntityToResponseDto(quiz);

    return new ReturnModel<QuizResponseDto>()
    {
      Success = true,
      Message = "Quiz başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<QuizListItemDto>>> GetMostTakenQuizzesAsync(
    int count,
    CancellationToken cancellationToken = default)
  {
    List<Quiz> quizzes = await _quizRepository.GetMostTakenQuizzesAsync(
      count,
      include: query => query
        .Include(q => q.Questions)
        .Include(q => q.UserQuizResults),
      enableTracking: false,
      cancellationToken: cancellationToken);

    List<QuizListItemDto> response = _mapper.EntityToListItemDtoList(quizzes);

    return new ReturnModel<List<QuizListItemDto>>()
    {
      Success = true,
      Message = "En çok çözülen quizler başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CursorPagedResponse<QuizListItemDto>>> GetRecentQuizzesAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    CancellationToken cancellationToken = default)
  {
    List<Quiz> quizzes = await _quizRepository.GetRecentQuizzesAsync(
      count + 1,
      lastDateCursor,
      lastIdCursor,
      include: query => query
        .Include(q => q.Questions)
        .Include(q => q.UserQuizResults),
      enableTracking: false,
      cancellationToken: cancellationToken);

    bool hasNextPage = quizzes.Count > count;
    var itemsToReturn = hasNextPage ? quizzes.Take(count).ToList() : quizzes;

    List<QuizListItemDto> response = _mapper.EntityToListItemDtoList(itemsToReturn);

    var pagedResponse = new CursorPagedResponse<QuizListItemDto>
    {
      Items = response,
      NextCursorDate = itemsToReturn.LastOrDefault()?.CreatedDate,
      NextCursorId = itemsToReturn.LastOrDefault()?.Id.ToString(),
      HasNextPage = hasNextPage
    };

    return new ReturnModel<CursorPagedResponse<QuizListItemDto>>()
    {
      Success = true,
      Message = "En son eklenen quizler başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedQuizResponseDto>> AddAsync(
    CreateQuizRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.QuizTitleCannotBeDuplicatedAsync(request.Title, cancellationToken);
    _businessRules.QuestionsMustHaveExactlyOneCorrectAnswer(request.Questions);

    Quiz quiz = _mapper.CreateToEntity(request);

    await _quizRepository.AddAsync(quiz, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedQuizResponseDto response = _mapper.EntityToCreatedResponseDto(quiz);

    return new ReturnModel<CreatedQuizResponseDto>()
    {
      Success = true,
      Message = "Quiz başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdateQuizRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.QuizTitleCannotBeDuplicatedWhenUpdatedAsync(request.Id, request.Title, cancellationToken);

    Quiz quiz = await _businessRules.GetQuizIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _mapper.UpdateEntityFromRequest(request, quiz);

    _quizRepository.Update(quiz);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Quiz başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    Quiz quiz = await _businessRules.GetQuizIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _quizRepository.Delete(quiz);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Quiz başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CheckQuizAnswerResponse>> CheckAnswerAsync(
    CheckQuizAnswerRequest request,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _checkAnswerValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Quiz quiz = await _businessRules.GetQuizIfExistAsync(
      request.QuizId,
      include: query => query
        .Include(q => q.Questions.Where(question => question.Id == request.QuestionId))
        .ThenInclude(q => q.Answers),
      enableTracking: false,
      cancellationToken: cancellationToken);

    _businessRules.QuizMustBeActive(quiz);

    Question question = _businessRules.GetQuestionBelongingToQuizIfExist(quiz, request.QuestionId);
    Answer correctAnswer = _businessRules.GetCorrectAnswerIfExist(question);

    bool isCorrect = false;

    if (request.AnswerId.HasValue)
    {
      bool answerBelongsToQuestion = question.Answers.Any(a => a.Id == request.AnswerId.Value);

      if (!answerBelongsToQuestion)
      {
        throw new BusinessException("Gönderilen cevap bu soruya ait değil.");
      }

      isCorrect = request.AnswerId.Value == correctAnswer.Id;
    }

    var response = new CheckQuizAnswerResponse(
      isCorrect,
      correctAnswer.Id,
      question.Explanation);

    return new ReturnModel<CheckQuizAnswerResponse>()
    {
      Success = true,
      Message = "Cevap kontrolü başarılı bir şekilde tamamlandı.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<UserQuizResultResponseDto>> SubmitQuizAsync(
    SubmitQuizRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _submitValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Quiz quiz = await _businessRules.GetQuizIfExistAsync(
      request.QuizId,
      include: query => query.Include(q => q.Questions).ThenInclude(q => q.Answers),
      enableTracking: false,
      cancellationToken: cancellationToken);

    _businessRules.QuizMustBeActive(quiz);
    _businessRules.SubmitAnswersMustBeValid(quiz, request.Answers);

    TimeSpan completionTime = _businessRules.ClampCompletionTime(
      request.CompletionTime,
      quiz.Questions.Count);

    int totalScore = 0;

    Dictionary<Guid, Guid> userAnswersDict = request.Answers
      .ToDictionary(a => a.QuestionId, a => a.AnswerId);

    foreach (Question question in quiz.Questions)
    {
      if (!userAnswersDict.TryGetValue(question.Id, out Guid submittedAnswerId))
      {
        continue;
      }

      Answer? correctAnswer = question.Answers.FirstOrDefault(a => a.IsCorrect);

      if (correctAnswer != null && correctAnswer.Id == submittedAnswerId)
      {
        totalScore += question.Points;
      }
    }

    var result = new UserQuizResult
    {
      QuizId = quiz.Id,
      UserId = currentUserId,
      Score = totalScore,
      CompletionTime = completionTime,
      CompletedAt = DateTime.Now
    };

    await _userQuizResultRepository.AddAsync(result, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    int maxScore = quiz.Questions.Sum(q => q.Points);

    var response = new UserQuizResultResponseDto(
      result.Id,
      result.QuizId,
      result.UserId,
      result.Score,
      maxScore,
      result.CompletionTime,
      result.CompletedAt
    );

    return new ReturnModel<UserQuizResultResponseDto>()
    {
      Success = true,
      Message = "Quiz sonucu başarıyla kaydedildi.",
      Data = response,
      StatusCode = 201
    };
  }

  private static List<QuizLeaderboardEntryDto> BuildLeaderboardEntries(
    List<UserQuizResult> results,
    int take,
    int minDistinctQuizzes)
  {
    return results
      .GroupBy(r => new { r.UserId, Username = r.User.Username })
      .Select(g => new
      {
        g.Key.Username,
        AverageScore = Math.Round(g.Average(r => (double)r.Score), 2),
        AverageCompletionTime = TimeSpan.FromTicks((long)g.Average(r => r.CompletionTime.Ticks)),
        DistinctQuizCount = g.Select(r => r.QuizId).Distinct().Count()
      })
      .Where(x => x.DistinctQuizCount >= minDistinctQuizzes)
      .OrderByDescending(x => x.AverageScore)
      .ThenBy(x => x.AverageCompletionTime)
      .Take(take)
      .Select((x, index) => new QuizLeaderboardEntryDto(
        Rank: index + 1,
        Username: x.Username,
        AverageScore: x.AverageScore,
        AverageCompletionTime: x.AverageCompletionTime,
        DistinctQuizCount: x.DistinctQuizCount))
      .ToList();
  }
}
