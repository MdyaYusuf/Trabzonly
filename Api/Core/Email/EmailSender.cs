using MailKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;

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

public class EmailSender(
  ILogger<EmailSender> _logger,
  IOptions<EmailOptions> _options,
  IHostEnvironment _environment) : IEmailSender
{
  public async Task SendAsync(
    string toEmail,
    string subject,
    string htmlBody,
    CancellationToken cancellationToken = default)
  {
    EmailOptions options = _options.Value;

    if (!string.IsNullOrWhiteSpace(options.SmtpHost) && !string.IsNullOrWhiteSpace(options.FromAddress))
    {
      try
      {
        var message = new MimeMessage();
        message.From.Add(MailboxAddress.Parse(options.FromAddress));
        message.To.Add(MailboxAddress.Parse(toEmail));
        message.Subject = subject;
        message.Body = new TextPart("html")
        {
          Text = htmlBody
        };

        using var client = new SmtpClient();

        await client.ConnectAsync(
          options.SmtpHost,
          options.SmtpPort,
          ResolveSecureSocketOptions(options),
          cancellationToken);

        if (!string.IsNullOrWhiteSpace(options.SmtpUsername))
        {
          await client.AuthenticateAsync(
            options.SmtpUsername,
            options.SmtpPassword ?? string.Empty,
            cancellationToken);
        }

        await client.SendAsync(new SendRequest(message), cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);

        _logger.LogInformation(
          "E-posta gönderildi. Alıcı: {To}. Konu: {Subject}",
          toEmail,
          subject);

        return;
      }
      catch (Exception ex)
      {
        _logger.LogError(
          ex,
          "E-posta gönderimi başarısız. Alıcı: {To}. Konu: {Subject}",
          toEmail,
          subject);

        throw;
      }
    }

    if (_environment.IsProduction())
    {
      _logger.LogWarning(
        "E-posta gönderilmedi: SMTP yapılandırılmadı. Alıcı: {To}. Konu: {Subject}",
        toEmail,
        subject);
    }
    else
    {
      _logger.LogInformation(
        "E-posta gönderilmedi: SMTP yapılandırılmadı. Alıcı: {To}. Konu: {Subject}",
        toEmail,
        subject);
    }
  }

  private static SecureSocketOptions ResolveSecureSocketOptions(EmailOptions options)
  {
    if (!options.EnableSsl)
    {
      return SecureSocketOptions.None;
    }

    if (options.SmtpPort == 465)
    {
      return SecureSocketOptions.SslOnConnect;
    }

    return SecureSocketOptions.StartTls;
  }
}
