using Microsoft.AspNetCore.Mvc;
using Residential.Api.DTOs.Transactions;
using Residential.Api.Interfaces;
using Residential.Api.Mappers;
using Residential.Api.Models.Enums;

namespace Residential.Api.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IPersonRepository _personRepository;

        public TransactionsController(ITransactionRepository transactionRepository, IPersonRepository personRepository) {
            _transactionRepository = transactionRepository;
            _personRepository = personRepository;
        }

        // Orquestra a criação validando dependências (existência da pessoa) e regras de negócio complexas
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTransactionRequestDto dto) {
            // Valida se a pessoa atrelada à transação realmente existe no banco
            var person = await _personRepository.GetByIdAsync(dto.PersonId);
            if (person == null) {
                return NotFound($"Pessoa com Id {dto.PersonId} não encontrada.");
            }

            // Regra de negócio: menores de 18 anos só podem registrar despesas
            if (person.Age < 18 && dto.Type == TransactionType.Income) {
                return BadRequest("Pessoas menores de 18 anos não podem cadastrar receitas.");
            }

            // Converte o payload, persiste no banco e retorna a rota para visualização (201 Created)
            var transaction = dto.ToTransactionFromCreateDto();
            var created = await _transactionRepository.AddAsync(transaction);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created.ToDto());
        }

        // Lista todo o histórico de transações, mapeando para o contrato de saída (DTO)
        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var transactions = await _transactionRepository.GetAllAsync();
            return Ok(transactions.Select(t => t.ToDto()));
        }

        // Busca os detalhes de um lançamento específico pelo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) {
            var transaction = await _transactionRepository.GetByIdAsync(id);
            if (transaction == null) {
                return NotFound();
            }

            return Ok(transaction.ToDto());
        }

        // Retorna o extrato de um usuário específico, útil para interfaces de detalhamento no Front-end
        [HttpGet("person/{personId}")]
        public async Task<IActionResult> GetByPersonId(int personId) {
            var transactions = await _transactionRepository.GetByPersonIdAsync(personId);
            return Ok(transactions.Select(t => t.ToDto()));
        }
    }
}