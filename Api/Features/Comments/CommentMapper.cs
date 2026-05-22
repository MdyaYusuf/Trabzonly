using Riok.Mapperly.Abstractions;

namespace Api.Features.Comments;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class CommentMapper
{
  public partial Comment CreateToEntity(CreateCommentRequest request);
  public partial void UpdateEntityFromRequest(UpdateCommentRequest request, Comment entity);
  [MapProperty("User.Username", "AuthorUsername")]
  public partial CommentResponseDto EntityToResponseDto(Comment entity);
  public partial List<CommentResponseDto> EntityToResponseDtoList(List<Comment> entities);
}