using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Posts;

public class PostReactionConfiguration : IEntityTypeConfiguration<PostReaction>
{
  public void Configure(EntityTypeBuilder<PostReaction> builder)
  {
    builder.ToTable("PostReactions");

    builder.HasKey(r => r.Id);

    builder.Property(r => r.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(r => r.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(r => r.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(r => r.Type)
      .HasConversion<int>()
      .IsRequired();

    builder.HasIndex(r => new { r.UserId, r.PostId })
      .IsUnique();

    builder.HasOne(r => r.User)
      .WithMany()
      .HasForeignKey(r => r.UserId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(r => r.Post)
      .WithMany(p => p.Reactions)
      .HasForeignKey(r => r.PostId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
