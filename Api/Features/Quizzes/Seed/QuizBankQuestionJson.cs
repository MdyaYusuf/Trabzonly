using System.Text.Json.Serialization;

namespace Api.Features.Quizzes.Seed;

public sealed class QuizBankQuestionJson
{
  [JsonPropertyName("soru_no")]
  public int SoruNo { get; set; }

  [JsonPropertyName("soru")]
  public string Soru { get; set; } = string.Empty;

  [JsonPropertyName("secenekler")]
  public Dictionary<string, string> Secenekler { get; set; } = new();

  [JsonPropertyName("dogru_cevap")]
  public string DogruCevap { get; set; } = string.Empty;

  [JsonPropertyName("aciklama")]
  public string? Aciklama { get; set; }
}
