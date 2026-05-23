using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Features.Categories;

namespace Api.Features.Blogs;

public class BlogConfiguration : IEntityTypeConfiguration<Blog>
{
  public void Configure(EntityTypeBuilder<Blog> builder)
  {
    builder.ToTable("Blogs");

    builder.HasKey(b => b.Id);

    builder.Property(b => b.Id)
      .HasColumnName("Id")
      .IsRequired();

    builder.Property(b => b.CreatedDate)
      .HasColumnName("CreatedDate")
      .IsRequired();

    builder.Property(b => b.UpdatedDate)
      .HasColumnName("UpdatedDate")
      .IsRequired(false);

    builder.Property(b => b.Title)
      .HasMaxLength(200)
      .IsRequired();

    builder.Property(b => b.Description)
      .HasMaxLength(500)
      .IsRequired(false);

    builder.Property(b => b.Content)
      .IsRequired();

    builder.Property(b => b.ImageUrl)
      .HasMaxLength(500);

    builder.HasOne(b => b.User)
      .WithMany(u => u.Blogs)
      .HasForeignKey(b => b.UserId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasOne(b => b.Category)
      .WithMany(c => c.Blogs)
      .HasForeignKey(b => b.CategoryId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}