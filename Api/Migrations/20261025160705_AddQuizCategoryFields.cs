using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Trabzonly.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddQuizCategoryFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Questions_QuizId",
                table: "Questions");

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "Quizzes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SeedKey",
                table: "Quizzes",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Explanation",
                table: "Questions",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SortOrder",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_Category",
                table: "Quizzes",
                column: "Category");

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_SeedKey",
                table: "Quizzes",
                column: "SeedKey",
                unique: true,
                filter: "[SeedKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuizId_SortOrder",
                table: "Questions",
                columns: new[] { "QuizId", "SortOrder" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Quizzes_Category",
                table: "Quizzes");

            migrationBuilder.DropIndex(
                name: "IX_Quizzes_SeedKey",
                table: "Quizzes");

            migrationBuilder.DropIndex(
                name: "IX_Questions_QuizId_SortOrder",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "SeedKey",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "Explanation",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "SortOrder",
                table: "Questions");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuizId",
                table: "Questions",
                column: "QuizId");
        }
    }
}
