using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Squads;

public class SquadRatingConfiguration : IEntityTypeConfiguration<SquadRating>
{
  public void Configure(EntityTypeBuilder<SquadRating> builder)
  {
    builder.ToTable("SquadRatings");

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

    builder.HasIndex(r => new { r.UserId, r.SquadId })
      .IsUnique();

    builder.HasOne(r => r.Squad)
      .WithMany(s => s.Ratings)
      .HasForeignKey(r => r.SquadId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(r => r.User)
      .WithMany(u => u.SquadRatings)
      .HasForeignKey(r => r.UserId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
