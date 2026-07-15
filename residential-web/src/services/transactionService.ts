import api from "./api";
import type { TransactionDto, CreateTransactionRequestDto } from "../types/Transaction";

//Busca o histórico global de todas as transações da casa.
export async function getAllTransactions(): Promise<TransactionDto[]> {
  const response = await api.get<TransactionDto[]>("/transactions");
  return response.data;
}

//Registra uma nova movimentação financeira (Receita ou Despesa).
export async function createTransaction(data: CreateTransactionRequestDto): Promise<TransactionDto> {
  const response = await api.post<TransactionDto>("/transactions", data);
  return response.data;
}

//Busca o extrato de transações de um morador específico.
export async function getTransactionsByPersonId(personId: number): Promise<TransactionDto[]> {
  const response = await api.get<TransactionDto[]>(`/transactions/person/${personId}`);
  return response.data;
}