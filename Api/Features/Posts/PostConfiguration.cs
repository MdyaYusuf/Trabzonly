using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Posts;

public class PostConfiguration : IEntityTypeConfiguration<Post>
{
  public void Configure(EntityTypeBuilder<Post> builder)
  {
    builder.ToTable("Posts");

    builder.HasKey(b => b.Id);

    builder.Property(b => b.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(b => b.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(b => b.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(b => b.Title)
      .HasMaxLength(200)
      .IsRequired();

    builder.Property(b => b.Description)
      .HasMaxLength(500)
      .IsRequired(false);

    builder.Property(b => b.Content)
      .IsRequired();

    builder.Property(b => b.ImageUrl)
      .HasMaxLength(500);

    builder.Property(b => b.LikeCount)
      .HasDefaultValue(0)
      .IsRequired();

    builder.Property(b => b.DislikeCount)
      .HasDefaultValue(0)
      .IsRequired();

    builder.HasOne(b => b.User)
      .WithMany(u => u.Posts)
      .HasForeignKey(b => b.UserId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasOne(b => b.Category)
      .WithMany(c => c.Posts)
      .HasForeignKey(b => b.CategoryId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}