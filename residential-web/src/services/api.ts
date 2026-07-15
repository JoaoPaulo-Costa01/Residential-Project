import axios from "axios";

/**
 * Instância global do Axios configurada com a URL base da nossa API em .NET.
 * Centraliza as configurações de cabeçalho para todas as requisições.
 */
const api = axios.create({
  baseURL: "http://localhost:7254/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;