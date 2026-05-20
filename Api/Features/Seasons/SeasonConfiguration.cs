using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Seasons;

public class SeasonConfiguration : IEntityTypeConfiguration<Season>
{
  public void Configure(EntityTypeBuilder<Season> builder)
  {
    builder.ToTable("Seasons");

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

    builder.Property(s => s.Name)
      .HasMaxLength(20)
      .IsRequired();

    builder.Property(s => s.StartDate)
      .IsRequired();

    builder.Property(s => s.EndDate)
      .IsRequired();
  }
}