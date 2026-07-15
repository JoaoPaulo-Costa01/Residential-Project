export interface PersonTotalsDto {
  personId: number;
  name: string;
  age: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface HouseholdTotalsDto {
  people: PersonTotalsDto[];
  grandTotalIncome: number;
  grandTotalExpense: number;
  grandTotalBalance: number;
}