using Microsoft.AspNetCore.Mvc;
using Residential.Api.DTOs.People;
using Residential.Api.Interfaces;
using Residential.Api.Mappers;

namespace Residential.Api.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : ControllerBase {
        private readonly IPersonRepository _personRepository;

        public PeopleController(IPersonRepository personRepository) {
            _personRepository = personRepository;
        }

        // Recebe o DTO de criação, converte para Entidade, salva no banco e retorna 201 (Created) com o local do recurso
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePersonRequestDto dto) {
            var person = dto.ToPersonFromCreateDto();
            var created = await _personRepository.AddAsync(person);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created.ToDto());
        }

        // Lista todas as pessoas convertendo as Entidades para DTOs (ocultando dados sensíveis de infraestrutura)
        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var people = await _personRepository.GetAllAsync();
            return Ok(people.Select(p => p.ToDto()));
        }

        // Retorna os dados de uma pessoa específica ou 404 (Not Found) se o ID não existir
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) {
            var person = await _personRepository.GetByIdAsync(id);
            if (person == null) {
                return NotFound();
            }

            return Ok(person.ToDto());
        }

        // Remove a pessoa. Retorna 204 (No Content) em caso de sucesso, indicando que a requisição foi cumprida
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var deleted = await _personRepository.DeleteAsync(id);
            if (!deleted) {
                return NotFound();
            }

            return NoContent();
        }
    }
}