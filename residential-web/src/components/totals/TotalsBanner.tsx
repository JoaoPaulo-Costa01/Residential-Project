import { formatCurrency } from "../../utils/currency";

interface TotalsBannerProps {
  //Soma total das receitas da casa
  income: number;
  //Soma total das despesas da casa
  expense: number;
  //Saldo geral da casa (receitas - despesas)
  balance: number;
}

/**
 * Banner com o fechamento financeiro geral da casa.
 * Exibe Receita e Despesa em tom neutro, e o Saldo destacado
 * em verde (positivo) ou vermelho (negativo).
 */
export function TotalsBanner({ income, expense, balance }: TotalsBannerProps) {
  const isPositive = balance >= 0;

  return (
    <div className="grid grid-cols-1 gap-4 rounded-md border border-slate-200 bg-white p-6 sm:grid-cols-3">
      <div>
        <p className="text-sm text-slate-500">Receita total</p>
        <p className="mt-1 text-xl font-semibold text-slate-900">
          {formatCurrency(income)}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Despesa total</p>
        <p className="mt-1 text-xl font-semibold text-slate-900">
          {formatCurrency(expense)}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Saldo da casa</p>
        <p
          className={`mt-1 text-xl font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
}