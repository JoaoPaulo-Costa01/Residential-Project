namespace Residential.Api.DTOs.Totals {
    public class PersonTotalsDto {
        public int PersonId { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal TotalExpense { get; set; }
        // Pode ser negativo quando as despesas superam as receitas da pessoa
        public decimal Balance { get; set; }
    }
}
