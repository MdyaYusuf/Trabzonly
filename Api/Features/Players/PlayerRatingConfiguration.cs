using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Players;

public class PlayerRatingConfiguration : IEntityTypeConfiguration<PlayerRating>
{
  public void Configure(EntityTypeBuilder<PlayerRating> builder)
  {
    builder.ToTable("PlayerRatings");

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

    builder.HasIndex(r => new { r.UserId, r.PlayerId })
      .IsUnique();

    builder.HasOne(r => r.Player)
      .WithMany(p => p.Ratings)
      .HasForeignKey(r => r.PlayerId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(r => r.User)
      .WithMany(u => u.PlayerRatings)
      .HasForeignKey(r => r.UserId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
