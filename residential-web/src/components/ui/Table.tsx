import type { ReactNode } from "react";

interface TableProps {
  //Títulos exibidos no cabeçalho da tabela
  headers: string[];
  //Linhas da tabela (normalmente elementos <tr> com <td>)
  children: ReactNode;
  //Mensagem exibida quando não houver nenhuma linha (opcional)
  emptyMessage?: string;
  //Indica se a tabela está sem dados, para exibir o emptyMessage
  isEmpty?: boolean;
}

/**
 * Wrapper que padroniza a exibição de tabelas HTML na aplicação,
 * com bordas sutis e cabeçalho em tom neutro. Usado nas listagens
 * de Pessoas, Transações e Totais.
 */
export function Table({ headers, children, emptyMessage, isEmpty }: TableProps) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 font-medium text-slate-600"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {isEmpty ? (
            <tr>
              <td
                colSpan={headers.length}
                className="px-4 py-6 text-center text-slate-400"
              >
                {emptyMessage ?? "Nenhum registro encontrado."}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}