using Riok.Mapperly.Abstractions;

namespace Api.Features.Quizzes;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class QuizMapper
{
  public partial Quiz CreateToEntity(CreateQuizRequest request);

  [MapperIgnoreSource(nameof(UpdateQuizRequest.Questions))]
  public partial void UpdateEntityFromRequest(UpdateQuizRequest request, Quiz entity);
  public partial QuizResponseDto EntityToResponseDto(Quiz entity);
  public partial CreatedQuizResponseDto EntityToCreatedResponseDto(Quiz entity);
  public partial List<QuizResponseDto> EntityToResponseDtoList(List<Quiz> entities);
  public partial QuizPreviewDto EntityToPreviewDto(Quiz entity);
  public partial List<QuizPreviewDto> EntityToPreviewDtoList(List<Quiz> entities);

  public QuizListItemDto EntityToListItemDto(Quiz entity)
  {
    return new QuizListItemDto(
      entity.Id,
      entity.Title,
      entity.Description,
      entity.Category,
      entity.Questions.Count,
      entity.UserQuizResults.Count,
      entity.IsActive);
  }

  public List<QuizListItemDto> EntityToListItemDtoList(List<Quiz> entities)
  {
    return entities.Select(EntityToListItemDto).ToList();
  }

  public QuizTakeDto EntityToTakeDto(Quiz entity)
  {
    List<QuizTakeQuestionDto> questions = entity.Questions
      .OrderBy(q => q.SortOrder)
      .Select(q => new QuizTakeQuestionDto(
        q.Id,
        q.Text,
        q.Points,
        q.SortOrder,
        q.Answers
          .Select(a => new QuizTakeAnswerDto(a.Id, a.Text))
          .ToList()))
      .ToList();

    return new QuizTakeDto(
      entity.Id,
      entity.Title,
      entity.Description,
      entity.Category,
      questions);
  }
}
