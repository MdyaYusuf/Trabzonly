using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.MatchWeek;

public class MatchWeekConfiguration : IEntityTypeConfiguration<MatchWeek>
{
  public void Configure(EntityTypeBuilder<MatchWeek> builder)
  {
    builder.ToTable("MatchWeeks");

    builder.HasKey(mw => mw.Id);

    builder.Property(mw => mw.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(mw => mw.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(mw => mw.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(mw => mw.Formation)
      .HasMaxLength(20)
      .IsRequired();

    builder.Property(mw => mw.IsHome)
      .HasDefaultValue(true)
      .IsRequired();

    builder.Property(mw => mw.HomeScore)
      .IsRequired(false);

    builder.Property(mw => mw.AwayScore)
      .IsRequired(false);

    builder.HasOne(mw => mw.Season)
      .WithMany(s => s.MatchWeeks)
      .HasForeignKey(mw => mw.SeasonId)
      .OnDelete(DeleteBehavior.Cascade)
      .IsRequired();

    builder.HasOne(mw => mw.OpponentClub)
      .WithMany(c => c.OpponentMatchWeeks)
      .HasForeignKey(mw => mw.OpponentClubId)
      .OnDelete(DeleteBehavior.Restrict)
      .IsRequired();

    builder.HasIndex(mw => mw.SeasonId)
      .IsUnique();
  }
}
