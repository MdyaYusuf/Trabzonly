using Riok.Mapperly.Abstractions;

namespace Api.Features.Quizzes;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class QuizMapper
{
  public partial Quiz CreateToEntity(CreateQuizRequest request);
  public partial void UpdateEntityFromRequest(UpdateQuizRequest request, Quiz entity);
  public partial QuizResponseDto EntityToResponseDto(Quiz entity);
  public partial CreatedQuizResponseDto EntityToCreatedResponseDto(Quiz entity);
  public partial List<QuizResponseDto> EntityToResponseDtoList(List<Quiz> entities);
  public partial QuizPreviewDto EntityToPreviewDto(Quiz entity);
  public partial List<QuizPreviewDto> EntityToPreviewDtoList(List<Quiz> entities);
}