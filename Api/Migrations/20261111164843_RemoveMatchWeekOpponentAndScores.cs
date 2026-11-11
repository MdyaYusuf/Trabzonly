using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Trabzonly.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveMatchWeekOpponentAndScores : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchWeeks_Clubs_OpponentClubId",
                table: "MatchWeeks");

            migrationBuilder.DropIndex(
                name: "IX_MatchWeeks_OpponentClubId",
                table: "MatchWeeks");

            migrationBuilder.DropColumn(
                name: "AwayScore",
                table: "MatchWeeks");

            migrationBuilder.DropColumn(
                name: "HomeScore",
                table: "MatchWeeks");

            migrationBuilder.DropColumn(
                name: "IsHome",
                table: "MatchWeeks");

            migrationBuilder.DropColumn(
                name: "OpponentClubId",
                table: "MatchWeeks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AwayScore",
                table: "MatchWeeks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HomeScore",
                table: "MatchWeeks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsHome",
                table: "MatchWeeks",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<int>(
                name: "OpponentClubId",
                table: "MatchWeeks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeeks_OpponentClubId",
                table: "MatchWeeks",
                column: "OpponentClubId");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchWeeks_Clubs_OpponentClubId",
                table: "MatchWeeks",
                column: "OpponentClubId",
                principalTable: "Clubs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
