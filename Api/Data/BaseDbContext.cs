using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Api.Features.Blogs;
using Api.Features.Comments;
using Api.Features.Players;
using Api.Features.Positions;
using Api.Features.Injuries;
using Api.Features.Roles;
using Api.Features.Seasons;
using Api.Features.Users;
using Api.Features.Quizzes;
using Api.Features.Stats;
using Api.Features.Categories;
using Api.Core.Helpers;

namespace Api.Data;

public class BaseDbContext : DbContext
{
  public BaseDbContext(DbContextOptions<BaseDbContext> options) : base(options)
  {

  }

  public DbSet<User> Users { get; set; }
  public DbSet<Role> Roles { get; set; }
  public DbSet<Comment> Comments { get; set; }
  public DbSet<Blog> Blogs { get; set; }
  public DbSet<Category> Categories { get; set; }
  public DbSet<Player> Players { get; set; }
  public DbSet<Position> Positions { get; set; }
  public DbSet<Season> Seasons { get; set; }
  public DbSet<PlayerStats> PlayerStats { get; set; }
  public DbSet<Injury> Injuries { get; set; }
  public DbSet<Quiz> Quizzes { get; set; }
  public DbSet<Question> Questions { get; set; }
  public DbSet<Answer> Answers { get; set; }
  public DbSet<UserQuizResult> UserQuizResults { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

    foreach (var entityType in modelBuilder.Model.GetEntityTypes())
    {
      var primaryKey = entityType.FindPrimaryKey();

      if (primaryKey != null && primaryKey.Properties.Count == 1)
      {
        var pkProperty = primaryKey.Properties[0];

        if (pkProperty.ClrType == typeof(Guid))
        {
          pkProperty.SetValueGeneratorFactory((_, _) => new UuidV7ValueGenerator());
        }
      }
    }
  }
}