using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Polls;

public class PollOptionConfiguration : IEntityTypeConfiguration<PollOption>
{
  public void Configure(EntityTypeBuilder<PollOption> builder)
  {
    builder.ToTable("PollOptions");

    builder.HasKey(o => o.Id);

    builder.Property(o => o.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(o => o.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(o => o.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(o => o.Label)
      .HasMaxLength(200)
      .IsRequired();

    builder.Property(o => o.SortOrder)
      .IsRequired();

    builder.Property(o => o.VoteCount)
      .HasDefaultValue(0)
      .IsRequired();

    builder.HasOne(o => o.Poll)
      .WithMany(p => p.Options)
      .HasForeignKey(o => o.PollId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
