using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;

namespace Api.Features.Quizzes;

public class QuizCategoryService(
  IQuizCategoryRepository _quizCategoryRepository,
  QuizCategoryMapper _mapper,
  QuizCategoryBusinessRules _businessRules,
  QuizBusinessRules _quizBusinessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreateQuizCategoryRequest> _createValidator,
  IValidator<UpdateQuizCategoryRequest> _updateValidator) : IQuizCategoryService
{
  public async Task<ReturnModel<List<QuizCategoryResponseDto>>> GetActiveAsync(
    CancellationToken cancellationToken = default)
  {
    List<QuizCategory> categories = await _quizCategoryRepository.GetAllAsync(
      filter: c => c.IsActive,
      orderBy: query => query.OrderBy(c => c.Name),
      enableTracking: false,
      cancellationToken: cancellationToken);

    return new ReturnModel<List<QuizCategoryResponseDto>>()
    {
      Success = true,
      Message = "Aktif quiz kategorileri başarılı bir şekilde getirildi.",
      Data = _mapper.EntityToResponseDtoList(categories),
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<QuizCategoryResponseDto>>> GetAllForAdminAsync(
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _quizBusinessRules.AdminRoleRequired(userRole);

    List<QuizCategory> categories = await _quizCategoryRepository.GetAllAsync(
      orderBy: query => query.OrderBy(c => c.Name),
      enableTracking: false,
      cancellationToken: cancellationToken);

    return new ReturnModel<List<QuizCategoryResponseDto>>()
    {
      Success = true,
      Message = "Quiz kategorileri başarılı bir şekilde getirildi.",
      Data = _mapper.EntityToResponseDtoList(categories),
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<QuizCategoryResponseDto>> GetByIdAsync(
    int id,
    CancellationToken cancellationToken = default)
  {
    QuizCategory category = await _businessRules.GetCategoryIfExistAsync(
      id,
      enableTracking: false,
      cancellationToken: cancellationToken);

    return new ReturnModel<QuizCategoryResponseDto>()
    {
      Success = true,
      Message = "Quiz kategorisi başarılı bir şekilde getirildi.",
      Data = _mapper.EntityToResponseDto(category),
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedQuizCategoryResponseDto>> AddAsync(
    CreateQuizCategoryRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _quizBusinessRules.AdminRoleRequired(userRole);

    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.CategoryNameCannotBeDuplicatedAsync(request.Name, cancellationToken);

    QuizCategory category = _mapper.CreateToEntity(request);

    await _quizCategoryRepository.AddAsync(category, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<CreatedQuizCategoryResponseDto>()
    {
      Success = true,
      Message = "Quiz kategorisi başarılı bir şekilde eklendi.",
      Data = _mapper.EntityToCreatedResponseDto(category),
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdateQuizCategoryRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _quizBusinessRules.AdminRoleRequired(userRole);

    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.CategoryNameCannotBeDuplicatedWhenUpdatedAsync(
      request.Id,
      request.Name,
      cancellationToken);

    QuizCategory category = await _businessRules.GetCategoryIfExistAsync(
      request.Id,
      enableTracking: true,
      cancellationToken: cancellationToken);

    _mapper.UpdateEntityFromRequest(request, category);
    _quizCategoryRepository.Update(category);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Quiz kategorisi başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    int id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _quizBusinessRules.AdminRoleRequired(userRole);

    await _businessRules.CategoryMustNotHaveQuizzesWhenDeletedAsync(id, cancellationToken);

    QuizCategory category = await _businessRules.GetCategoryIfExistAsync(
      id,
      enableTracking: true,
      cancellationToken: cancellationToken);

    _quizCategoryRepository.Delete(category);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Quiz kategorisi başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }
}
