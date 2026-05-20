using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Injuries;

public class InjuryConfiguration : IEntityTypeConfiguration<Injury>
{
  public void Configure(EntityTypeBuilder<Injury> builder)
  {
    builder.ToTable("Injuries");

    builder.HasKey(i => i.Id);

    builder.Property(i => i.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(i => i.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(i => i.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(i => i.Name)
      .HasMaxLength(150)
      .IsRequired();

    builder.HasOne(i => i.Player)
      .WithMany(p => p.Injuries)
      .HasForeignKey(i => i.PlayerId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(i => i.Season)
      .WithMany(s => s.Injuries)
      .HasForeignKey(i => i.SeasonId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}