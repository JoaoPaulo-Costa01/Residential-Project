// Mappers/TransactionMappers.cs
using Residential.Api.DTOs.Transactions;
using Residential.Api.Models;

namespace Residential.Api.Mappers {
    // Mantém o código das Controllers limpo, garantindo que elas não precisem instanciar Models manualmente.
    public static class TransactionMappers {

        // Traduz o payload JSON da criação de transação em um objeto compreensível pelo SQL Server.
        public static Transaction ToTransactionFromCreateDto(this CreateTransactionRequestDto dto) {
            return new Transaction {
                Description = dto.Description,
                Amount = dto.Amount,
                Type = dto.Type,
                PersonId = dto.PersonId
            };
        }

        // Prepara a transação salva (agora com um Id gerado pelo banco) para ser retornada com sucesso ao front-end.
        public static TransactionDto ToDto(this Transaction transaction) {
            return new TransactionDto {
                Id = transaction.Id,
                Description = transaction.Description,
                Amount = transaction.Amount,
                Type = transaction.Type,
                PersonId = transaction.PersonId
            };
        }
    }
}