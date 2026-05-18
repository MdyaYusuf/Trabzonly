using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public class BaseDbContext : DbContext
{
  public BaseDbContext(DbContextOptions<BaseDbContext> options) : base(options)
  {

  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}