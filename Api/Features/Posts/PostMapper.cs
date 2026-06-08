using Riok.Mapperly.Abstractions;

namespace Api.Features.Posts;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class PostMapper
{
  public partial Post CreateToEntity(CreatePostRequest request);
  public partial void UpdateEntityFromRequest(UpdatePostRequest request, Post entity);
  [MapProperty("User.Username", "AuthorUsername")]
  [MapProperty("Category.Name", "CategoryName")]
  public partial PostResponseDto EntityToResponseDto(Post entity);
  public partial CreatedPostResponseDto EntityToCreatedResponseDto(Post entity);
  public partial List<PostResponseDto> EntityToResponseDtoList(List<Post> entities);

  [MapProperty("User.Username", "AuthorUsername")]
  [MapProperty("Category.Name", "CategoryName")]
  public partial PostPreviewDto EntityToPreviewDto(Post entity);
  public partial List<PostPreviewDto> EntityToPreviewDtoList(List<Post> entities);
}