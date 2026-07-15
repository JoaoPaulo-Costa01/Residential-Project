using Residential.Api.Models.Enums;

namespace Residential.Api.DTOs.Transactions {
    public class TransactionDto {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        public int PersonId { get; set; }
    }
}
