using System.Linq.Expressions;
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
  IValidator<SubmitQuizRequest> _submitValidator) : IQuizService
{
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

  public async Task<ReturnModel<List<QuizResponseDto>>> GetMostTakenQuizzesAsync(
    int count,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Quiz> quizzes = await _quizRepository.GetMostTakenQuizzesAsync(
      count,
      include: include ?? (query => query.Include(q => q.Questions).ThenInclude(q => q.Answers)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<QuizResponseDto> response = _mapper.EntityToResponseDtoList(quizzes);

    return new ReturnModel<List<QuizResponseDto>>()
    {
      Success = true,
      Message = "En çok çözülen quizler başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CursorPagedResponse<QuizResponseDto>>> GetRecentQuizzesAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    // Request count + 1 to check if there is a next page
    List<Quiz> quizzes = await _quizRepository.GetRecentQuizzesAsync(
      count + 1,
      lastDateCursor,
      lastIdCursor,
      include: include ?? (query => query.Include(q => q.Questions).ThenInclude(q => q.Answers)),
      enableTracking,
      withDeleted,
      cancellationToken);

    bool hasNextPage = quizzes.Count > count;
    var itemsToReturn = hasNextPage ? quizzes.Take(count).ToList() : quizzes;

    List<QuizResponseDto> response = _mapper.EntityToResponseDtoList(itemsToReturn);

    var pagedResponse = new CursorPagedResponse<QuizResponseDto>
    {
      Items = response,
      NextCursorDate = itemsToReturn.LastOrDefault()?.CreatedDate,
      NextCursorId = itemsToReturn.LastOrDefault()?.Id,
      HasNextPage = hasNextPage
    };

    return new ReturnModel<CursorPagedResponse<QuizResponseDto>>()
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

  public async Task<ReturnModel<UserQuizResultResponseDto>> SubmitQuizAsync(
    SubmitQuizRequest request,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _submitValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Quiz quiz = await _businessRules.GetQuizIfExistAsync(
      request.QuizId,
      include: query => query.Include(q => q.Questions).ThenInclude(q => q.Answers.Where(a => a.IsCorrect)),
      enableTracking: false,
      cancellationToken: cancellationToken);

    _businessRules.QuizMustBeActive(quiz);

    int totalScore = 0;

    var userAnswersDict = request.Answers
      .GroupBy(a => a.QuestionId)
      .ToDictionary(g => g.Key, g => g.First().AnswerId);

    foreach (var question in quiz.Questions)
    {
      if (userAnswersDict.TryGetValue(question.Id, out var submittedAnswerId))
      {
        if (question.Answers.Any(a => a.Id == submittedAnswerId))
        {
          totalScore += question.Points;
        }
      }
    }

    var result = new UserQuizResult
    {
      QuizId = quiz.Id,
      UserId = request.UserId,
      Score = totalScore,
      CompletionTime = request.CompletionTime,
      CompletedAt = DateTime.Now
    };

    await _userQuizResultRepository.AddAsync(result, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    var response = new UserQuizResultResponseDto(
      result.Id,
      result.QuizId,
      result.UserId,
      result.Score,
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
}