using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Stats;

public class PlayerStatsConfiguration : IEntityTypeConfiguration<PlayerStats>
{
  public void Configure(EntityTypeBuilder<PlayerStats> builder)
  {
    builder.ToTable("PlayerStats");

    builder.HasKey(s => s.Id);

    builder.Property(s => s.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(s => s.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(s => s.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(s => s.Team)
      .HasMaxLength(100)
      .IsRequired();

    builder.HasIndex(s => new { s.PlayerId, s.SeasonId, s.Team })
      .IsUnique();

    builder.HasOne(s => s.Player)
      .WithMany(p => p.Stats)
      .HasForeignKey(s => s.PlayerId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(s => s.Season)
      .WithMany(s => s.PlayerStats)
      .HasForeignKey(s => s.SeasonId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}