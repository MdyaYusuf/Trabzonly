using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Polls;

public class PollVoteConfiguration : IEntityTypeConfiguration<PollVote>
{
  public void Configure(EntityTypeBuilder<PollVote> builder)
  {
    builder.ToTable("PollVotes");

    builder.HasKey(v => v.Id);

    builder.Property(v => v.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(v => v.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(v => v.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.HasIndex(v => new { v.UserId, v.PollId })
      .IsUnique();

    builder.HasOne(v => v.User)
      .WithMany()
      .HasForeignKey(v => v.UserId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(v => v.Poll)
      .WithMany(p => p.Votes)
      .HasForeignKey(v => v.PollId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(v => v.PollOption)
      .WithMany(o => o.Votes)
      .HasForeignKey(v => v.PollOptionId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
