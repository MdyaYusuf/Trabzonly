using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Users;

public class UserFollowConfiguration : IEntityTypeConfiguration<UserFollow>
{
  public void Configure(EntityTypeBuilder<UserFollow> builder)
  {
    builder.ToTable("UserFollows");

    builder.HasKey(f => f.Id);

    builder.Property(f => f.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(f => f.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(f => f.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.HasOne(f => f.Follower)
      .WithMany(u => u.Following)
      .HasForeignKey(f => f.FollowerId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasOne(f => f.Following)
      .WithMany(u => u.Followers)
      .HasForeignKey(f => f.FollowingId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasIndex(f => new { f.FollowerId, f.FollowingId })
      .IsUnique();
  }
}
