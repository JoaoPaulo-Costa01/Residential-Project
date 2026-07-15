import { isAxiosError } from "axios";

/**
 * Extrai uma mensagem de erro amigável a partir de um erro do Axios.
 * Cobre os formatos retornados pela API .NET: string simples (BadRequest/NotFound
 * com texto), ValidationProblemDetails (erros de Data Annotations) ou erro genérico.
 */
export function extractErrorMessage(error: unknown): string {
  const fallback = "Ocorreu um erro ao processar a requisição.";

  if (!isAxiosError(error)) {
    return fallback;
  }

  const data = error.response?.data;

  // Controllers retornam BadRequest("texto") ou NotFound("texto") como string simples
  if (typeof data === "string" && data.trim().length > 0) {
    return data;
  }

  // ValidationProblemDetails do ASP.NET Core (erros de Data Annotations do ModelState)
  if (data && typeof data === "object") {
    if ("errors" in data && data.errors && typeof data.errors === "object") {
      const firstField = Object.values(
        data.errors as Record<string, string[]>
      )[0];
      if (Array.isArray(firstField) && firstField.length > 0) {
        return firstField[0];
      }
    }

    if ("title" in data && typeof data.title === "string") {
      return data.title;
    }
  }

  return fallback;
}