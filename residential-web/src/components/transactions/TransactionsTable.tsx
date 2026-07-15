import { Table } from "../ui/Table";
import { formatCurrency } from "../../utils/currency";
import { TransactionTypeValues } from "../../types/Transaction";
import type { TransactionDto } from "../../types/Transaction";
import type { PersonDto } from "../../types/Person";

interface TransactionsTableProps {
  //Lista de transações cadastradas
  transactions: TransactionDto[];
  //Lista de moradores, usada para resolver o nome a partir do personId
  people: PersonDto[];
}

/**
 * Listagem das transações cadastradas, exibindo o nome do morador
 * (em vez do personId) e o tipo em português (Despesa/Receita).
 */
export function TransactionsTable({
  transactions,
  people,
}: TransactionsTableProps) {
  //Resolve o nome do morador a partir do personId da transação
  function getPersonName(personId: number): string {
    const person = people.find((p) => p.id === personId);
    return person ? person.name : "Desconhecido";
  }

  return (
    <Table
      headers={["Descrição", "Valor", "Tipo", "Morador"]}
      isEmpty={transactions.length === 0}
      emptyMessage="Nenhuma transação cadastrada ainda."
    >
      {transactions.map((transaction) => {
        const isIncome = transaction.type === TransactionTypeValues.Income;

        return (
          <tr key={transaction.id}>
            <td className="px-4 py-3 text-slate-900">
              {transaction.description}
            </td>
            <td
              className={`px-4 py-3 font-medium ${
                isIncome ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(transaction.amount)}
            </td>
            <td className="px-4 py-3 text-slate-600">
              {isIncome ? "Receita" : "Despesa"}
            </td>
            <td className="px-4 py-3 text-slate-600">
              {getPersonName(transaction.personId)}
            </td>
          </tr>
        );
      })}
    </Table>
  );
}