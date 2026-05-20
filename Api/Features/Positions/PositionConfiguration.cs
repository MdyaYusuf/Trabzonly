using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Positions;

public class PositionConfiguration : IEntityTypeConfiguration<Position>
{
  public void Configure(EntityTypeBuilder<Position> builder)
  {
    builder.ToTable("Positions");

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
      .HasMaxLength(50)
      .IsRequired();

    builder.Property(p => p.Abbreviation)
      .HasMaxLength(10)
      .IsRequired();

    builder.HasIndex(p => p.Abbreviation)
      .IsUnique();
  }
}