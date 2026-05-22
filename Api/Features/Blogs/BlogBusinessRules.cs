using Api.Core.Exceptions;

namespace Api.Features.Blogs;

public class BlogBusinessRules(IBlogRepository _blogRepository)
{
  public async Task<Blog> GetBlogIfExistAsync(
    Guid id,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var blog = await _blogRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (blog == null)
    {
      throw new NotFoundException($"{id} numaralı blog bulunamadı.");
    }

    return blog;
  }

  public void UserMustBeOwnerOrAdmin(
    Guid blogUserId,
    Guid currentUserId,
    string userRole)
  {
    if (blogUserId != currentUserId && userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }
}