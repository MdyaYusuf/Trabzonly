using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.MatchWeek;

public class ClubConfiguration : IEntityTypeConfiguration<Club>
{
  public void Configure(EntityTypeBuilder<Club> builder)
  {
    builder.ToTable("Clubs");

    builder.HasKey(c => c.Id);

    builder.Property(c => c.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(c => c.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(c => c.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(c => c.Name)
      .HasMaxLength(100)
      .IsRequired();

    builder.Property(c => c.ShortName)
      .HasMaxLength(20)
      .IsRequired(false);

    builder.Property(c => c.IsTrabzonspor)
      .HasDefaultValue(false)
      .IsRequired();

    builder.HasIndex(c => c.Name)
      .IsUnique();

    builder.HasIndex(c => c.IsTrabzonspor);
  }
}
