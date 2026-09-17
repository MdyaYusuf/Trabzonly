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

    builder.Property(s => s.AverageRating)
      .HasPrecision(4, 2)
      .HasDefaultValue(0m)
      .IsRequired();

    builder.Property(s => s.RatingCount)
      .HasDefaultValue(0)
      .IsRequired();

    builder.HasOne(s => s.User)
      .WithMany(u => u.Squads)
      .HasForeignKey(s => s.UserId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
