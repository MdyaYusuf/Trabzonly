using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.ContactMessages;

public class ContactMessageConfiguration : IEntityTypeConfiguration<ContactMessage>
{
  public void Configure(EntityTypeBuilder<ContactMessage> builder)
  {
    builder.ToTable("ContactMessages");

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

    builder.Property(m => m.Message)
      .HasMaxLength(400)
      .IsRequired();

    builder.Property(m => m.IsRead)
      .HasDefaultValue(false)
      .IsRequired();

    builder.Property(m => m.IsResolved)
      .HasDefaultValue(false)
      .IsRequired();

    builder.HasOne(m => m.User)
      .WithMany(u => u.ContactMessages)
      .HasForeignKey(m => m.UserId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasIndex(m => new { m.UserId, m.CreatedDate });
    builder.HasIndex(m => new { m.IsRead, m.CreatedDate });
    builder.HasIndex(m => new { m.IsResolved, m.CreatedDate });
  }
}
