using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Trabzonly.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemovePostImageUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Posts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Posts",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }
    }
}
