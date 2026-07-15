import { useState } from "react";
import { Table } from "../ui/Table";
import { Button } from "../ui/Button";
import type { PersonDto } from "../../types/Person";

interface PeopleTableProps {
  // Lista de moradores cadastrados
  people: PersonDto[];
  // Função chamada com o id do morador ao clicar em excluir
  onDelete: (id: number) => Promise<void>;
}

/**
 * Listagem dos moradores cadastrados, com botão de exclusão por linha.
 * Controla individualmente o estado de "excluindo" para evitar
 * múltiplos cliques no mesmo registro.
 */
export function PeopleTable({ people, onDelete }: PeopleTableProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Table
      headers={["Nome", "Idade", ""]}
      isEmpty={people.length === 0}
      emptyMessage="Nenhum morador cadastrado ainda."
    >
      {people.map((person) => (
        <tr key={person.id}>
          <td className="px-4 py-3 text-slate-900">{person.name}</td>
          <td className="px-4 py-3 text-slate-600">{person.age}</td>
          <td className="px-4 py-3 text-right">
            <Button
              variant="danger"
              onClick={() => handleDelete(person.id)}
              disabled={deletingId === person.id}
            >
              {deletingId === person.id ? "Excluindo..." : "Excluir"}
            </Button>
          </td>
        </tr>
      ))}
    </Table>
  );
}