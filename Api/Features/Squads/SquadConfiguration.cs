using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Squads;

public class SquadConfiguration : IEntityTypeConfiguration<Squad>
{
  public void Configure(EntityTypeBuilder<Squad> builder)
  {
    builder.ToTable("Squads");

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

    builder.Property(s => s.Title)
      .HasMaxLength(200)
      .IsRequired();

    builder.Property(s => s.Formation)
      .HasMaxLength(50)
      .IsRequired();

    builder.Property(s => s.Notes)
      .HasMaxLength(SquadTactics.NotesMaxLength)
      .IsRequired()
      .HasDefaultValue(string.Empty);

    builder.Property(s => s.AttackStyle)
      .HasMaxLength(20)
      .IsRequired();

    builder.Property(s => s.DefenseLine)
      .HasMaxLength(20)
      .IsRequired();

    builder.Property(s => s.Tempo)
      .HasMaxLength(20)
      .IsRequired();

    builder.Property(s => s.CaptainPlayerId)
      .IsRequired();

    builder.Property(s => s.CornerTakerPlayerId)
      .IsRequired();

    builder.Property(s => s.FreeKickTakerPlayerId)
      .IsRequired();

    builder.Property(s => s.AverageRating)
      .HasPrecision(4, 2)
      .HasDefaultValue(0m)
      .IsRequired();

    builder.Property(s => s.RatingCount)
      .HasDefaultValue(0)
      .IsRequired();

    builder.Property(s => s.ViewCount)
      .HasDefaultValue(0)
      .IsRequired();

    builder.Property(s => s.CommentCount)
      .HasDefaultValue(0)
      .IsRequired();

    builder.HasOne(s => s.User)
      .WithMany(u => u.Squads)
      .HasForeignKey(s => s.UserId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasOne(s => s.CaptainPlayer)
      .WithMany()
      .HasForeignKey(s => s.CaptainPlayerId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasOne(s => s.CornerTakerPlayer)
      .WithMany()
      .HasForeignKey(s => s.CornerTakerPlayerId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasOne(s => s.FreeKickTakerPlayer)
      .WithMany()
      .HasForeignKey(s => s.FreeKickTakerPlayerId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
