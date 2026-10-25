using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Quizzes;

public class QuestionConfiguration : IEntityTypeConfiguration<Question>
{
  public void Configure(EntityTypeBuilder<Question> builder)
  {
    builder.ToTable("Questions");

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

    builder.Property(q => q.Text)
      .HasMaxLength(1000)
      .IsRequired();

    builder.Property(q => q.Explanation)
      .HasMaxLength(2000)
      .IsRequired(false);

    builder.Property(q => q.Points)
      .IsRequired();

    builder.Property(q => q.SortOrder)
      .IsRequired();

    builder.HasIndex(q => new { q.QuizId, q.SortOrder });

    builder.HasOne(q => q.Quiz)
      .WithMany(qz => qz.Questions)
      .HasForeignKey(q => q.QuizId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
