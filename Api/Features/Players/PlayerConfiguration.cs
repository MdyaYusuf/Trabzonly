using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Players;

public class PlayerConfiguration : IEntityTypeConfiguration<Player>
{
  public void Configure(EntityTypeBuilder<Player> builder)
  {
    builder.ToTable("Players");

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

    builder.Property(p => p.Name)
      .HasMaxLength(100)
      .IsRequired();

    builder.Property(p => p.Nationality)
      .HasMaxLength(100)
      .IsRequired();

    builder.Property(p => p.PreferredFoot)
      .HasMaxLength(20)
      .IsRequired();

    builder.Property(p => p.CurrentTeam)
      .HasMaxLength(100)
      .IsRequired();

    builder.Property(p => p.Description)
      .HasMaxLength(2000)
      .IsRequired(false);

    builder.Property(p => p.MarketValue)
      .HasColumnType("decimal(18,2)")
      .IsRequired(false);

    builder.Property(p => p.Wage)
      .HasColumnType("decimal(18,2)")
      .IsRequired(false);

    builder.HasOne(p => p.Position)
      .WithMany(pos => pos.Players)
      .HasForeignKey(p => p.PositionId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}