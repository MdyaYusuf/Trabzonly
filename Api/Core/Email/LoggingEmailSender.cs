using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Api.Core.Email;

public class EmailOptions
{
  public string FrontendBaseUrl { get; set; } = "http://localhost:5173";
  public string? FromAddress { get; set; }
  public string? SmtpHost { get; set; }
  public int SmtpPort { get; set; } = 587;
  public string? SmtpUsername { get; set; }
  public string? SmtpPassword { get; set; }
  public bool EnableSsl { get; set; } = true;
}

public class LoggingEmailSender(
  ILogger<LoggingEmailSender> _logger,
  IOptions<EmailOptions> _options) : IEmailSender
{
  public Task SendAsync(
    string toEmail,
    string subject,
    string htmlBody,
    CancellationToken cancellationToken = default)
  {
    EmailOptions options = _options.Value;

    if (!string.IsNullOrWhiteSpace(options.SmtpHost) && !string.IsNullOrWhiteSpace(options.FromAddress))
    {
      using var client = new System.Net.Mail.SmtpClient(options.SmtpHost, options.SmtpPort)
      {
        EnableSsl = options.EnableSsl,
        DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network
      };

      if (!string.IsNullOrWhiteSpace(options.SmtpUsername))
      {
        client.Credentials = new System.Net.NetworkCredential(options.SmtpUsername, options.SmtpPassword);
      }

      using var message = new System.Net.Mail.MailMessage(options.FromAddress, toEmail, subject, htmlBody)
      {
        IsBodyHtml = true
      };

      client.Send(message);
      return Task.CompletedTask;
    }

    _logger.LogInformation(
      "E-posta gönderimi (SMTP yapılandırılmadı). Alıcı: {To}. Konu: {Subject}. Gövde: {Body}",
      toEmail,
      subject,
      htmlBody);

    return Task.CompletedTask;
  }
}
