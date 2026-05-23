using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Blogs;

namespace Api.Features.Categories;

public class Category : Entity<int>
{
  [SetsRequiredMembers]
  public Category()
  {
    Name = default!;
  }

  public required string Name { get; set; }
  public string? Description { get; set; }
  public bool IsActive { get; set; } = true;

  // Navigation properties
  public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();
}