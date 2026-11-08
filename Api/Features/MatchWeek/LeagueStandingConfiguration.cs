using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.MatchWeek;

public class LeagueStandingConfiguration : IEntityTypeConfiguration<LeagueStanding>
{
  public void Configure(EntityTypeBuilder<LeagueStanding> builder)
  {
    builder.ToTable("LeagueStandings");

    builder.HasKey(ls => ls.Id);

    builder.Property(ls => ls.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(ls => ls.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(ls => ls.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(ls => ls.Played)
      .HasDefaultValue(0)
      .IsRequired();

    builder.Property(ls => ls.Won)
      .HasDefaultValue(0)
      .IsRequired();

    builder.Property(ls => ls.Drawn)
      .HasDefaultValue(0)
      .IsRequired();

    builder.Property(ls => ls.Lost)
      .HasDefaultValue(0)
      .IsRequired();

    builder.Property(ls => ls.GoalsFor)
      .HasDefaultValue(0)
      .IsRequired();

    builder.Property(ls => ls.GoalsAgainst)
      .HasDefaultValue(0)
      .IsRequired();

    builder.Property(ls => ls.Points)
      .HasDefaultValue(0)
      .IsRequired();

    builder.Property(ls => ls.Rank)
      .HasDefaultValue(0)
      .IsRequired();

    builder.HasOne(ls => ls.Season)
      .WithMany(s => s.LeagueStandings)
      .HasForeignKey(ls => ls.SeasonId)
      .OnDelete(DeleteBehavior.Cascade)
      .IsRequired();

    builder.HasOne(ls => ls.Club)
      .WithMany(c => c.Standings)
      .HasForeignKey(ls => ls.ClubId)
      .OnDelete(DeleteBehavior.Restrict)
      .IsRequired();

    builder.HasIndex(ls => new { ls.SeasonId, ls.ClubId })
      .IsUnique();

    builder.HasIndex(ls => new { ls.SeasonId, ls.Rank });
  }
}
