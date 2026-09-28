using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Metrics;

public class MetricConfiguration : IEntityTypeConfiguration<Metric>
{
  public void Configure(EntityTypeBuilder<Metric> builder)
  {
    builder.ToTable("Metrics");

    builder.HasKey(m => m.Id);

    builder.Property(m => m.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(m => m.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(m => m.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(m => m.Key)
      .HasMaxLength(100)
      .IsRequired();

    builder.Property(m => m.DisplayName)
      .HasMaxLength(150)
      .IsRequired();

    builder.Property(m => m.Value)
      .IsRequired();

    builder.Property(m => m.Description)
      .HasMaxLength(500)
      .IsRequired(false);

    builder.HasIndex(m => m.Key)
      .IsUnique();
  }
}
