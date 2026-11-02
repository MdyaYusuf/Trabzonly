using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Positions;

public class PositionRoleConfiguration : IEntityTypeConfiguration<PositionRole>
{
  public void Configure(EntityTypeBuilder<PositionRole> builder)
  {
    builder.ToTable("PositionRoles");

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

    builder.Property(r => r.Name)
      .HasMaxLength(80)
      .IsRequired();

    builder.Property(r => r.Description)
      .HasMaxLength(300)
      .IsRequired();

    builder.Property(r => r.SortOrder)
      .IsRequired();

    builder.HasIndex(r => new { r.PositionId, r.Name })
      .IsUnique();

    builder.HasIndex(r => new { r.PositionId, r.SortOrder });

    builder.HasOne(r => r.Position)
      .WithMany(p => p.Roles)
      .HasForeignKey(r => r.PositionId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
