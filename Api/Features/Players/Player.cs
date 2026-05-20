using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Comments;
using Api.Features.Positions;
using Api.Features.Injuries;
using Api.Features.Stats;

namespace Api.Features.Players;

public class Player : Entity<Guid>
{
  [SetsRequiredMembers]
  public Player()
  {
    Name = default!;
    Nationality = default!;
    PreferredFoot = default!;
    CurrentTeam = default!;
  }

  public required string Name { get; set; }
  public required string Nationality { get; set; }
  public DateTime DateOfBirth { get; set; }
  public int? Height { get; set; }
  public int? Weight { get; set; }
  public required string PreferredFoot { get; set; }
  public decimal? MarketValue { get; set; }
  public decimal? Wage { get; set; }
  public required string CurrentTeam { get; set; }
  public string? Description { get; set; }
  public string? ImageUrl { get; set; }
  public bool IsActive { get; set; } = true;

  [NotMapped]
  public int Age => DateOfBirth != default ? (DateTime.Today.Year - DateOfBirth.Year - (DateTime.Today.DayOfYear < DateOfBirth.DayOfYear ? 1 : 0)) : 0;

  // Navigation properties
  public Guid PositionId { get; set; }
  public virtual Position Position { get; set; } = default!;
  public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
  public virtual ICollection<Injury> Injuries { get; set; } = new List<Injury>();
  public virtual ICollection<PlayerStats> Stats { get; set; } = new List<PlayerStats>();
}