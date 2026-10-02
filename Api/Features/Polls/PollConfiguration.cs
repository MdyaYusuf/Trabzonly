using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Polls;

public class PollConfiguration : IEntityTypeConfiguration<Poll>
{
  public void Configure(EntityTypeBuilder<Poll> builder)
  {
    builder.ToTable("Polls");

    builder.HasKey(p => p.Id);

    builder.Property(p => p.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(p => p.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(p => p.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(p => p.Question)
      .HasMaxLength(300)
      .IsRequired();

    builder.Property(p => p.IsActive)
      .HasDefaultValue(true)
      .IsRequired();

    builder.HasOne(p => p.Player)
      .WithMany()
      .HasForeignKey(p => p.PlayerId)
      .OnDelete(DeleteBehavior.Cascade)
      .IsRequired(false);

    builder.HasOne(p => p.Post)
      .WithMany(post => post.Polls)
      .HasForeignKey(p => p.PostId)
      .OnDelete(DeleteBehavior.Cascade)
      .IsRequired(false);

    builder.HasIndex(p => new { p.PlayerId, p.IsActive });
    builder.HasIndex(p => new { p.PostId, p.IsActive });
  }
}
