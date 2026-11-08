using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.MatchWeek;

public class MatchWeekSlotConfiguration : IEntityTypeConfiguration<MatchWeekSlot>
{
  public void Configure(EntityTypeBuilder<MatchWeekSlot> builder)
  {
    builder.ToTable("MatchWeekSlots");

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

    builder.Property(s => s.IsStarter)
      .IsRequired();

    builder.Property(s => s.SortOrder)
      .IsRequired();

    builder.HasOne(s => s.MatchWeek)
      .WithMany(mw => mw.Slots)
      .HasForeignKey(s => s.MatchWeekId)
      .OnDelete(DeleteBehavior.Cascade)
      .IsRequired();

    builder.HasOne(s => s.Player)
      .WithMany()
      .HasForeignKey(s => s.PlayerId)
      .OnDelete(DeleteBehavior.Restrict)
      .IsRequired();

    builder.HasIndex(s => new { s.MatchWeekId, s.SlotKey })
      .IsUnique();

    builder.HasIndex(s => new { s.MatchWeekId, s.PlayerId })
      .IsUnique();

    builder.HasIndex(s => new { s.MatchWeekId, s.IsStarter, s.SortOrder });
  }
}
