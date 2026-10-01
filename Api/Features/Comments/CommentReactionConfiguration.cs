using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Comments;

public class CommentReactionConfiguration : IEntityTypeConfiguration<CommentReaction>
{
  public void Configure(EntityTypeBuilder<CommentReaction> builder)
  {
    builder.ToTable("CommentReactions");

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

    builder.HasIndex(r => new { r.UserId, r.CommentId })
      .IsUnique();

    builder.HasOne(r => r.User)
      .WithMany()
      .HasForeignKey(r => r.UserId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(r => r.Comment)
      .WithMany(c => c.Reactions)
      .HasForeignKey(r => r.CommentId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
