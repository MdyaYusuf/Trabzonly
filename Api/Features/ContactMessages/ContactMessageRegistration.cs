using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.ContactMessages;

public static class ContactMessageRegistration
{
  public static IServiceCollection AddContactMessageDependencies(this IServiceCollection services)
  {
    services.AddScoped<IContactMessageRepository, EfContactMessageRepository>();
    services.AddScoped<ContactMessageBusinessRules>();
    services.AddScoped<IContactMessageService, ContactMessageService>();

    return services;
  }
}
