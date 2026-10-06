using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Trabzonly.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSquadNotesViewsCommentsAndCommentSquadId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CommentCount",
                table: "Squads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Squads",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ViewCount",
                table: "Squads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "SquadId",
                table: "Comments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_SquadId",
                table: "Comments",
                column: "SquadId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Squads_SquadId",
                table: "Comments",
                column: "SquadId",
                principalTable: "Squads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Squads_SquadId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_SquadId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "CommentCount",
                table: "Squads");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Squads");

            migrationBuilder.DropColumn(
                name: "ViewCount",
                table: "Squads");

            migrationBuilder.DropColumn(
                name: "SquadId",
                table: "Comments");
        }
    }
}
