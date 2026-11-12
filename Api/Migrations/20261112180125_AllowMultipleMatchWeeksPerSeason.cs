using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Trabzonly.Api.Migrations
{
    /// <inheritdoc />
    public partial class AllowMultipleMatchWeeksPerSeason : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_MatchWeeks_SeasonId",
                table: "MatchWeeks");

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeeks_SeasonId",
                table: "MatchWeeks",
                column: "SeasonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_MatchWeeks_SeasonId",
                table: "MatchWeeks");

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeeks_SeasonId",
                table: "MatchWeeks",
                column: "SeasonId",
                unique: true);
        }
    }
}
