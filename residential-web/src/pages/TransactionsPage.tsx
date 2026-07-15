import { useEffect, useState } from "react";
import { TransactionForm } from "../components/transactions/TransactionForm";
import { TransactionsTable } from "../components/transactions/TransactionsTable";
import { getAllTransactions, createTransaction } from "../services/transactionService";
import { getAllPeople } from "../services/personService";
import type { TransactionDto, CreateTransactionRequestDto } from "../types/Transaction";
import type { PersonDto } from "../types/Person";

/**
 * Tela de gestão de transações. Busca transações e moradores em paralelo
 * ao carregar — a lista de moradores é necessária tanto para popular o
 * combo-box do formulário quanto para exibir o nome na listagem.
 */
export function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [people, setPeople] = useState<PersonDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [transactionsData, peopleData] = await Promise.all([
        getAllTransactions(),
        getAllPeople(),
      ]);
      setTransactions(transactionsData);
      setPeople(peopleData);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  //Cadastra uma nova transação e insere o resultado no estado local
  async function handleCreateTransaction(data: CreateTransactionRequestDto) {
    const created = await createTransaction(data);
    setTransactions((current) => [...current, created]);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold text-slate-900">Transações</h1>

      <TransactionForm onSubmit={handleCreateTransaction} people={people} />

      {isLoading ? (
        <p className="text-sm text-slate-500">Carregando transações...</p>
      ) : (
        <TransactionsTable transactions={transactions} people={people} />
      )}
    </div>
  );
}