using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.MatchWeek;

public class FixtureConfiguration : IEntityTypeConfiguration<Fixture>
{
  public void Configure(EntityTypeBuilder<Fixture> builder)
  {
    builder.ToTable("Fixtures");

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

    builder.Property(f => f.WeekNumber)
      .IsRequired();

    builder.Property(f => f.Kickoff)
      .IsRequired(false);

    builder.Property(f => f.HomeScore)
      .IsRequired(false);

    builder.Property(f => f.AwayScore)
      .IsRequired(false);

    builder.HasOne(f => f.Season)
      .WithMany(s => s.Fixtures)
      .HasForeignKey(f => f.SeasonId)
      .OnDelete(DeleteBehavior.Cascade)
      .IsRequired();

    builder.HasOne(f => f.HomeClub)
      .WithMany(c => c.HomeFixtures)
      .HasForeignKey(f => f.HomeClubId)
      .OnDelete(DeleteBehavior.Restrict)
      .IsRequired();

    builder.HasOne(f => f.AwayClub)
      .WithMany(c => c.AwayFixtures)
      .HasForeignKey(f => f.AwayClubId)
      .OnDelete(DeleteBehavior.Restrict)
      .IsRequired();

    builder.HasIndex(f => new { f.SeasonId, f.WeekNumber });
    builder.HasIndex(f => new { f.SeasonId, f.HomeClubId, f.AwayClubId, f.WeekNumber })
      .IsUnique();
  }
}
