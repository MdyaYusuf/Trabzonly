using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Squads;

public class SquadSlotConfiguration : IEntityTypeConfiguration<SquadSlot>
{
  public void Configure(EntityTypeBuilder<SquadSlot> builder)
  {
    builder.ToTable("SquadSlots");

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

    builder.Property(s => s.SlotKey)
      .HasMaxLength(20)
      .IsRequired();

    builder.Property(s => s.SortOrder)
      .IsRequired();

    builder.HasIndex(s => new { s.SquadId, s.SlotKey })
      .IsUnique();

    builder.HasIndex(s => new { s.SquadId, s.PlayerId })
      .IsUnique();

    builder.HasOne(s => s.Squad)
      .WithMany(sq => sq.Slots)
      .HasForeignKey(s => s.SquadId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(s => s.Player)
      .WithMany(p => p.SquadSlots)
      .HasForeignKey(s => s.PlayerId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
