using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Users;

namespace Api.Features.ContactMessages;

public class ContactMessage : Entity<int>
{
  [SetsRequiredMembers]
  public ContactMessage()
  {
    Message = default!;
  }

  public required string Message { get; set; }
  public bool IsRead { get; set; }
  public bool IsResolved { get; set; }

  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
}
