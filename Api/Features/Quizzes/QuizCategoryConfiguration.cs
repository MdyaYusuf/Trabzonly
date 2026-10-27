using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Quizzes;

public class QuizCategoryConfiguration : IEntityTypeConfiguration<QuizCategory>
{
  public void Configure(EntityTypeBuilder<QuizCategory> builder)
  {
    builder.ToTable("QuizCategories");

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

    builder.Property(c => c.Description)
      .HasMaxLength(500)
      .IsRequired(false);

    builder.Property(c => c.ImageUrl)
      .HasMaxLength(500)
      .IsRequired(false);

    builder.Property(c => c.SeedKey)
      .HasMaxLength(100)
      .IsRequired(false);

    builder.HasIndex(c => c.SeedKey)
      .IsUnique()
      .HasFilter("[SeedKey] IS NOT NULL");

    builder.HasIndex(c => c.Name);
  }
}
