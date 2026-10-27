using Riok.Mapperly.Abstractions;

namespace Api.Features.Quizzes;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class QuizCategoryMapper
{
  public partial QuizCategory CreateToEntity(CreateQuizCategoryRequest request);
  public partial void UpdateEntityFromRequest(UpdateQuizCategoryRequest request, QuizCategory entity);
  public partial QuizCategoryResponseDto EntityToResponseDto(QuizCategory entity);
  public partial CreatedQuizCategoryResponseDto EntityToCreatedResponseDto(QuizCategory entity);
  public partial List<QuizCategoryResponseDto> EntityToResponseDtoList(List<QuizCategory> entities);
}
