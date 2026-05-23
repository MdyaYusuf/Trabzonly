using Riok.Mapperly.Abstractions;

namespace Api.Features.Categories;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class CategoryMapper
{
  public partial Category CreateToEntity(CreateCategoryRequest request);
  public partial void UpdateEntityFromRequest(UpdateCategoryRequest request, Category entity);
  public partial CategoryResponseDto EntityToResponseDto(Category entity);
  public partial List<CategoryResponseDto> EntityToResponseDtoList(List<Category> entities);
}