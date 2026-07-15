import { Table } from "../ui/Table";
import { formatCurrency } from "../../utils/currency";
import type { PersonTotalsDto } from "../../types/Totals";

interface PersonTotalsTableProps {
  // Totais individuais de cada morador, vindos do HouseholdTotalsDto
  people: PersonTotalsDto[];
}

/**
 * Tabela que lista o balanço individual (receitas, despesas e saldo)
 * de cada morador cadastrado.
 */
export function PersonTotalsTable({ people }: PersonTotalsTableProps) {
  return (
    <Table
      headers={["Nome", "Idade", "Receitas", "Despesas", "Saldo"]}
      isEmpty={people.length === 0}
      emptyMessage="Nenhum morador cadastrado ainda."
    >
      {people.map((person) => {
        const isPositive = person.balance >= 0;

        return (
          <tr key={person.personId}>
            <td className="px-4 py-3 text-slate-900">{person.name}</td>
            <td className="px-4 py-3 text-slate-600">{person.age}</td>
            <td className="px-4 py-3 text-slate-600">
              {formatCurrency(person.totalIncome)}
            </td>
            <td className="px-4 py-3 text-slate-600">
              {formatCurrency(person.totalExpense)}
            </td>
            <td
              className={`px-4 py-3 font-medium ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(person.balance)}
            </td>
          </tr>
        );
      })}
    </Table>
  );
}