using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Quizzes;

public class AnswerConfiguration : IEntityTypeConfiguration<Answer>
{
  public void Configure(EntityTypeBuilder<Answer> builder)
  {
    builder.ToTable("Answers");

    builder.HasKey(a => a.Id);

    builder.Property(a => a.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(a => a.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(a => a.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(a => a.Text)
      .HasMaxLength(500)
      .IsRequired();

    builder.HasOne(a => a.Question)
      .WithMany(q => q.Answers)
      .HasForeignKey(a => a.QuestionId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}