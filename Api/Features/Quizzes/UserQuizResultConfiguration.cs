using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Features.Quizzes;

public class UserQuizResultConfiguration : IEntityTypeConfiguration<UserQuizResult>
{
  public void Configure(EntityTypeBuilder<UserQuizResult> builder)
  {
    builder.ToTable("UserQuizResults");

    builder.HasKey(uqr => uqr.Id);

    builder.Property(uqr => uqr.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(uqr => uqr.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(uqr => uqr.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.HasOne(uqr => uqr.User)
      .WithMany(u => u.QuizResults)
      .HasForeignKey(uqr => uqr.UserId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(uqr => uqr.Quiz)
      .WithMany(q => q.UserQuizResults)
      .HasForeignKey(uqr => uqr.QuizId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}