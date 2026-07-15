using Microsoft.AspNetCore.Mvc;
using Residential.Api.DTOs.Totals;
using Residential.Api.Interfaces;
using Residential.Api.Mappers;

namespace Residential.Api.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class TotalsController : ControllerBase {
        private readonly IPersonRepository _personRepository;

        public TotalsController(IPersonRepository personRepository) {
            _personRepository = personRepository;
        }

        // Endpoint consolidado: orquestra a busca de dados e o cálculo financeiro em memória antes de devolver ao Front-end
        [HttpGet]
        public async Task<IActionResult> GetTotals() {
            // Busca os usuários com suas transações
            var people = await _personRepository.GetAllWithTransactionsAsync();

            // Converte e calcula os totais individuais de cada pessoa
            var peopleTotals = people.Select(p => p.ToTotalsDto()).ToList();

            // Fechamento geral da casa: soma dos totais individuais já calculados por pessoa
            var household = new HouseholdTotalsDto {
                People = peopleTotals,
                GrandTotalIncome = peopleTotals.Sum(p => p.TotalIncome),
                GrandTotalExpense = peopleTotals.Sum(p => p.TotalExpense),
                GrandTotalBalance = peopleTotals.Sum(p => p.Balance)
            };

            return Ok(household);
        }
    }
}