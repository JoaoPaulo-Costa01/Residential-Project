namespace Residential.Api.DTOs.Totals {
    public class HouseholdTotalsDto {
        public List<PersonTotalsDto> People { get; set; }
        public decimal GrandTotalIncome { get; set; }
        public decimal GrandTotalExpense { get; set; }
        public decimal GrandTotalBalance { get; set; }
    }
}
