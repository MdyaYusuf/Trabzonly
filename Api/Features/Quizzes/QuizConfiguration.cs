using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Quizzes;

public class QuizConfiguration : IEntityTypeConfiguration<Quiz>
{
  public void Configure(EntityTypeBuilder<Quiz> builder)
  {
    builder.ToTable("Quizzes");

    builder.HasKey(q => q.Id);

    builder.Property(q => q.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(q => q.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(q => q.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(q => q.Title)
      .HasMaxLength(200)
      .IsRequired();

    builder.Property(q => q.Description)
      .HasMaxLength(1000)
      .IsRequired(false);

    builder.Property(q => q.QuizCategoryId)
      .IsRequired();

    builder.Property(q => q.SeedKey)
      .HasMaxLength(100)
      .IsRequired(false);

    builder.HasIndex(q => q.SeedKey)
      .IsUnique()
      .HasFilter("[SeedKey] IS NOT NULL");

    builder.HasIndex(q => q.QuizCategoryId);

    builder.HasOne(q => q.QuizCategory)
      .WithMany(c => c.Quizzes)
      .HasForeignKey(q => q.QuizCategoryId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
