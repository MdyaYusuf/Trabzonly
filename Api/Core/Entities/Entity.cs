namespace Api.Core.Entities;

public abstract class Entity<TId> where TId : notnull
{
  protected Entity()
  {
    CreatedDate = DateTimeOffset.UtcNow;
  }

  protected Entity(TId id) : this()
  {
    Id = id;
  }

  public TId Id { get; protected set; } = default!;
  public DateTimeOffset CreatedDate { get; set; }
  public DateTimeOffset? UpdatedDate { get; set; }
}