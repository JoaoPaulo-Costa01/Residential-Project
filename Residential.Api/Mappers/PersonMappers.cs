using Residential.Api.DTOs.People;
using Residential.Api.DTOs.Totals;
using Residential.Api.Models;
using Residential.Api.Models.Enums;

namespace Residential.Api.Mappers {
    // Classe estática que centraliza a lógica de conversão.
    // Isola a camada de apresentação (DTOs que vão/vêm do React) da camada de banco de dados (Models).
    public static class PersonMappers {

        // Converte o DTO de entrada (após passar pelas validações) em uma Entidade pronta para o EF Core salvar no banco.
        public static Person ToPersonFromCreateDto(this CreatePersonRequestDto dto) {
            return new Person {
                Name = dto.Name,
                Age = dto.Age
            };
        }

        // Pega os dados brutos da pessoa no banco e formata em um DTO limpo e seguro para devolver na resposta da API.
        public static PersonDto ToDto(this Person person) {
            return new PersonDto {
                Id = person.Id,
                Name = person.Name,
                Age = person.Age
            };
        }

        // Concentra a regra de negócio do cálculo de balanço financeiro em memória.
        // Assim, as Controllers ficam enxutas e focadas apenas em receber e responder requisições HTTP.
        public static PersonTotalsDto ToTotalsDto(this Person person) {
            // Soma as transações já carregadas em memória (Include feito no repositório)
            var totalIncome = person.Transactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Amount);

            var totalExpense = person.Transactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Amount);

            return new PersonTotalsDto {
                PersonId = person.Id,
                Name = person.Name,
                Age = person.Age,
                TotalIncome = totalIncome,
                TotalExpense = totalExpense,
                Balance = totalIncome - totalExpense
            };
        }
    }
}