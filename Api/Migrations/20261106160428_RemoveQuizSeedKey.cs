using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Trabzonly.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveQuizSeedKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Quizzes_SeedKey",
                table: "Quizzes");

            migrationBuilder.DropIndex(
                name: "IX_QuizCategories_SeedKey",
                table: "QuizCategories");

            migrationBuilder.DropColumn(
                name: "SeedKey",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "SeedKey",
                table: "QuizCategories");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SeedKey",
                table: "Quizzes",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeedKey",
                table: "QuizCategories",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_SeedKey",
                table: "Quizzes",
                column: "SeedKey",
                unique: true,
                filter: "[SeedKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_QuizCategories_SeedKey",
                table: "QuizCategories",
                column: "SeedKey",
                unique: true,
                filter: "[SeedKey] IS NOT NULL");
        }
    }
}
