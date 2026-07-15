import api from "./api";
import type { HouseholdTotalsDto } from "../types/Totals";

/**
 * Busca o balanço financeiro consolidado contendo o resumo da casa 
 * e os totais individuais de cada morador.
 */
export async function getHouseholdTotals(): Promise<HouseholdTotalsDto> {
  const response = await api.get<HouseholdTotalsDto>("/totals");
  return response.data;
}