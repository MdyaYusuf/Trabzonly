using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Trabzonly.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddMatchWeekDomain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DisplayedFixtureWeek",
                table: "Seasons",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateTable(
                name: "Clubs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ShortName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    IsTrabzonspor = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clubs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fixtures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SeasonId = table.Column<int>(type: "int", nullable: false),
                    WeekNumber = table.Column<int>(type: "int", nullable: false),
                    HomeClubId = table.Column<int>(type: "int", nullable: false),
                    AwayClubId = table.Column<int>(type: "int", nullable: false),
                    Kickoff = table.Column<DateTime>(type: "datetime2", nullable: true),
                    HomeScore = table.Column<int>(type: "int", nullable: true),
                    AwayScore = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fixtures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Fixtures_Clubs_AwayClubId",
                        column: x => x.AwayClubId,
                        principalTable: "Clubs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Fixtures_Clubs_HomeClubId",
                        column: x => x.HomeClubId,
                        principalTable: "Clubs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Fixtures_Seasons_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LeagueStandings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SeasonId = table.Column<int>(type: "int", nullable: false),
                    ClubId = table.Column<int>(type: "int", nullable: false),
                    Played = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    Won = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    Drawn = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    Lost = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    GoalsFor = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    GoalsAgainst = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    Points = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    Rank = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeagueStandings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeagueStandings_Clubs_ClubId",
                        column: x => x.ClubId,
                        principalTable: "Clubs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LeagueStandings_Seasons_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MatchWeeks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SeasonId = table.Column<int>(type: "int", nullable: false),
                    Formation = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    OpponentClubId = table.Column<int>(type: "int", nullable: false),
                    IsHome = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    HomeScore = table.Column<int>(type: "int", nullable: true),
                    AwayScore = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchWeeks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchWeeks_Clubs_OpponentClubId",
                        column: x => x.OpponentClubId,
                        principalTable: "Clubs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MatchWeeks_Seasons_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MatchWeekPlayerRatings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchWeekId = table.Column<int>(type: "int", nullable: false),
                    PlayerId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Score = table.Column<decimal>(type: "decimal(3,1)", precision: 3, scale: 1, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchWeekPlayerRatings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchWeekPlayerRatings_MatchWeeks_MatchWeekId",
                        column: x => x.MatchWeekId,
                        principalTable: "MatchWeeks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MatchWeekPlayerRatings_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MatchWeekPlayerRatings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MatchWeekSlots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchWeekId = table.Column<int>(type: "int", nullable: false),
                    PlayerId = table.Column<int>(type: "int", nullable: false),
                    SlotKey = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    IsStarter = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchWeekSlots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchWeekSlots_MatchWeeks_MatchWeekId",
                        column: x => x.MatchWeekId,
                        principalTable: "MatchWeeks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MatchWeekSlots_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clubs_IsTrabzonspor",
                table: "Clubs",
                column: "IsTrabzonspor");

            migrationBuilder.CreateIndex(
                name: "IX_Clubs_Name",
                table: "Clubs",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Fixtures_AwayClubId",
                table: "Fixtures",
                column: "AwayClubId");

            migrationBuilder.CreateIndex(
                name: "IX_Fixtures_HomeClubId",
                table: "Fixtures",
                column: "HomeClubId");

            migrationBuilder.CreateIndex(
                name: "IX_Fixtures_SeasonId_HomeClubId_AwayClubId_WeekNumber",
                table: "Fixtures",
                columns: new[] { "SeasonId", "HomeClubId", "AwayClubId", "WeekNumber" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Fixtures_SeasonId_WeekNumber",
                table: "Fixtures",
                columns: new[] { "SeasonId", "WeekNumber" });

            migrationBuilder.CreateIndex(
                name: "IX_LeagueStandings_ClubId",
                table: "LeagueStandings",
                column: "ClubId");

            migrationBuilder.CreateIndex(
                name: "IX_LeagueStandings_SeasonId_ClubId",
                table: "LeagueStandings",
                columns: new[] { "SeasonId", "ClubId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LeagueStandings_SeasonId_Rank",
                table: "LeagueStandings",
                columns: new[] { "SeasonId", "Rank" });

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeekPlayerRatings_MatchWeekId_PlayerId",
                table: "MatchWeekPlayerRatings",
                columns: new[] { "MatchWeekId", "PlayerId" });

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeekPlayerRatings_MatchWeekId_PlayerId_UserId",
                table: "MatchWeekPlayerRatings",
                columns: new[] { "MatchWeekId", "PlayerId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeekPlayerRatings_PlayerId",
                table: "MatchWeekPlayerRatings",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeekPlayerRatings_UserId",
                table: "MatchWeekPlayerRatings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeeks_OpponentClubId",
                table: "MatchWeeks",
                column: "OpponentClubId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeeks_SeasonId",
                table: "MatchWeeks",
                column: "SeasonId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeekSlots_MatchWeekId_IsStarter_SortOrder",
                table: "MatchWeekSlots",
                columns: new[] { "MatchWeekId", "IsStarter", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeekSlots_MatchWeekId_PlayerId",
                table: "MatchWeekSlots",
                columns: new[] { "MatchWeekId", "PlayerId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeekSlots_MatchWeekId_SlotKey",
                table: "MatchWeekSlots",
                columns: new[] { "MatchWeekId", "SlotKey" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MatchWeekSlots_PlayerId",
                table: "MatchWeekSlots",
                column: "PlayerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Fixtures");

            migrationBuilder.DropTable(
                name: "LeagueStandings");

            migrationBuilder.DropTable(
                name: "MatchWeekPlayerRatings");

            migrationBuilder.DropTable(
                name: "MatchWeekSlots");

            migrationBuilder.DropTable(
                name: "MatchWeeks");

            migrationBuilder.DropTable(
                name: "Clubs");

            migrationBuilder.DropColumn(
                name: "DisplayedFixtureWeek",
                table: "Seasons");
        }
    }
}
