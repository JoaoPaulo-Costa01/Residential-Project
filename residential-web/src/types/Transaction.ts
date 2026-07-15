export type TransactionType = 0 | 1;

export const TransactionTypeValues = {
  Expense: 0 as TransactionType,
  Income: 1 as TransactionType,
};

export interface TransactionDto {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  personId: number;
}

export interface CreateTransactionRequestDto {
  description: string;
  amount: number;
  type: TransactionType;
  personId: number;
}