using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Trabzonly.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddUserEmailConfirmation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailConfirmationToken",
                table: "Users",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "EmailConfirmationTokenExpiration",
                table: "Users",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailConfirmed",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailConfirmationToken",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EmailConfirmationTokenExpiration",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EmailConfirmed",
                table: "Users");
        }
    }
}
