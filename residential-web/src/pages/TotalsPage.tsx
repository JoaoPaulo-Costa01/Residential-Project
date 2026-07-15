import { useEffect, useState } from "react";
import { TotalsBanner } from "../components/totals/TotalsBanner";
import { PersonTotalsTable } from "../components/totals/PersonTotalsTable";
import { getHouseholdTotals } from "../services/totalsService";
import type { HouseholdTotalsDto } from "../types/Totals";

/**
 * Tela de resumo financeiro da casa. Busca o fechamento geral
 * (HouseholdTotalsDto) ao carregar e exibe o banner com os totais
 * gerais seguido da tabela de totais por morador.
 */
export function TotalsPage() {
  const [totals, setTotals] = useState<HouseholdTotalsDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTotals() {
      const data = await getHouseholdTotals();
      setTotals(data);
      setIsLoading(false);
    }

    fetchTotals();
  }, []);

  if (isLoading || !totals) {
    return <p className="text-sm text-slate-500">Carregando totais...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold text-slate-900">
        Resumo da casa
      </h1>

      <TotalsBanner
        income={totals.grandTotalIncome}
        expense={totals.grandTotalExpense}
        balance={totals.grandTotalBalance}
      />

      <PersonTotalsTable people={totals.people} />
    </div>
  );
}