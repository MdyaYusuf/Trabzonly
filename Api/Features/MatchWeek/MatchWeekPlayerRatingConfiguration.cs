using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.MatchWeek;

public class MatchWeekPlayerRatingConfiguration : IEntityTypeConfiguration<MatchWeekPlayerRating>
{
  public void Configure(EntityTypeBuilder<MatchWeekPlayerRating> builder)
  {
    builder.ToTable("MatchWeekPlayerRatings");

    builder.HasKey(r => r.Id);

    builder.Property(r => r.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(r => r.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(r => r.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(r => r.Score)
      .HasPrecision(3, 1)
      .IsRequired();

    builder.HasOne(r => r.MatchWeek)
      .WithMany(mw => mw.Ratings)
      .HasForeignKey(r => r.MatchWeekId)
      .OnDelete(DeleteBehavior.Cascade)
      .IsRequired();

    builder.HasOne(r => r.Player)
      .WithMany()
      .HasForeignKey(r => r.PlayerId)
      .OnDelete(DeleteBehavior.Restrict)
      .IsRequired();

    builder.HasOne(r => r.User)
      .WithMany()
      .HasForeignKey(r => r.UserId)
      .OnDelete(DeleteBehavior.Cascade)
      .IsRequired();

    builder.HasIndex(r => new { r.MatchWeekId, r.PlayerId, r.UserId })
      .IsUnique();

    builder.HasIndex(r => new { r.MatchWeekId, r.PlayerId });
  }
}
