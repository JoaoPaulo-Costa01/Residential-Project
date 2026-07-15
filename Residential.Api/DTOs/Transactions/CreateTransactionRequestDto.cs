using Residential.Api.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Residential.Api.DTOs.Transactions {
    public class CreateTransactionRequestDto {
        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "A descrição deve ter entre 2 e 50 caracteres.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "O valor é obrigatório.")]
        [Range(0.01, 100000.00, ErrorMessage = "O valor deve ser entre R$ 0,01 e R$ 100.000,00.")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "O tipo da transação é obrigatório.")]
        [EnumDataType(typeof(TransactionType), ErrorMessage = "O tipo da transação deve ser Despesa ou Receita.")]
        public TransactionType Type { get; set; }

        [Required(ErrorMessage = "A pessoa vinculada à transação é obrigatória.")]
        public int PersonId { get; set; }
    }
}
