using Microsoft.EntityFrameworkCore;
using Residential.Api.Models.Enums;

namespace Residential.Api.Models {
    public class Transaction {
        public int Id { get; set; }
        public string Description { get; set; }

        // Configura a precisão do decimal no banco de dados via Data Annotation
        [Precision(18, 2)]
        public decimal Amount { get; set; }

        // Define se é Despesa (0) ou Receita (1), blindando a regra de negócio com o Enum.
        public TransactionType Type { get; set; }

        // Chave estrangeira real no banco de dados (ID do dono da transação).
        public int PersonId { get; set; }

        // Navegação inversa: permite acessar os dados completos da pessoa a partir desta transação.
        public Person Person { get; set; }
    }
}
