using Riok.Mapperly.Abstractions;

namespace Api.Features.Blogs;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class BlogMapper
{
  public partial Blog CreateToEntity(CreateBlogRequest request);
  public partial void UpdateEntityFromRequest(UpdateBlogRequest request, Blog entity);
  [MapProperty("User.Username", "AuthorUsername")]
  [MapProperty("Category.Name", "CategoryName")]
  public partial BlogResponseDto EntityToResponseDto(Blog entity);
  public partial CreatedBlogResponseDto EntityToCreatedResponseDto(Blog entity);
  public partial List<BlogResponseDto> EntityToResponseDtoList(List<Blog> entities);

  [MapProperty("User.Username", "AuthorUsername")]
  [MapProperty("Category.Name", "CategoryName")]
  public partial BlogPreviewDto EntityToPreviewDto(Blog entity);
  public partial List<BlogPreviewDto> EntityToPreviewDtoList(List<Blog> entities);
}