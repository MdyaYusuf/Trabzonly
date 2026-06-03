using System.Text;
using System.Text.Json.Serialization;
using Api.Core.Middlewares;
using Api.Core.Security;
using Api.Data;
using Api.Features.Authentication;
using Api.Features.Blogs;
using Api.Features.Comments;
using Api.Features.Injuries;
using Api.Features.Players;
using Api.Features.Stats;
using Api.Features.Positions;
using Api.Features.Quizzes;
using Api.Features.Roles;
using Api.Features.Seasons;
using Api.Features.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Api.Features.Categories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options =>
{
  options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
  options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddDataDependencies(builder.Configuration);
builder.Services.AddUserDependencies();
builder.Services.AddRoleDependencies();
builder.Services.AddAuthenticationDependencies();
builder.Services.AddPlayerDependencies();
builder.Services.AddInjuryDependencies();
builder.Services.AddQuizDependencies();
builder.Services.AddBlogDependencies();
builder.Services.AddCategoryDependencies();
builder.Services.AddCommentDependencies();
builder.Services.AddPositionDependencies();
builder.Services.AddSeasonDependencies();
builder.Services.AddPlayerStatsDependencies();

builder.Services.Configure<TokenOptions>(builder.Configuration.GetSection("TokenOptions"));

var tokenOptions = builder.Configuration.GetSection("TokenOptions").Get<TokenOptions>() ?? throw new InvalidOperationException("TokenOptions bölümü yapılandırma dosyasında appsettings bulunamadı.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = true,
      ValidIssuer = tokenOptions.Issuer,
      ValidAudience = tokenOptions.Audience,
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenOptions.SecurityKey)),
      ClockSkew = TimeSpan.Zero
    };
    options.Events = new JwtBearerEvents
    {
      OnMessageReceived = context =>
      {
        if (context.Request.Cookies.ContainsKey("accessToken"))
        {
          context.Token = context.Request.Cookies["accessToken"];
        }
        return Task.CompletedTask;
      }
    };
  });

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

var app = builder.Build();

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
