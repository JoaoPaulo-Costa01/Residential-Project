using Microsoft.EntityFrameworkCore;
using Residential.Api.Data;
using Residential.Api.Interfaces;
using Residential.Api.Models;

namespace Residential.Api.Repositories {
    public class PersonRepository : IPersonRepository {

        private readonly AppDbContext _context;

        public PersonRepository(AppDbContext context) {
            _context = context;
        }

        // Adiciona a pessoa na memória do EF Core e efetiva a gravação no banco com SaveChangesAsync
        public async Task<Person> AddAsync(Person person) {
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();
            return person;
        }

        // Retorna a lista de pessoas de forma leve, sem carregar os relacionamentos (transações)
        public async Task<IEnumerable<Person>> GetAllAsync() {
            return await _context.People.ToListAsync();
        }

        // Busca uma pessoa específica pela chave primária. Retorna null se não encontrar.
        public async Task<Person?> GetByIdAsync(int id) {
            return await _context.People.FirstOrDefaultAsync(p => p.Id == id);
        }

        // Executa a exclusão de forma segura: verifica se existe antes de tentar remover.
        public async Task<bool> DeleteAsync(int id) {
            var person = await _context.People.FirstOrDefaultAsync(p => p.Id == id);
            if (person == null) {
                return false;
            }

            _context.People.Remove(person);
            // Cascade Delete configurado no AppDbContext remove as transações vinculadas automaticamente
            await _context.SaveChangesAsync();
            return true;
        }

        // Otimizado para cálculos: busca as pessoas e já faz o JOIN com a tabela de transações usando o Include
        public async Task<IEnumerable<Person>> GetAllWithTransactionsAsync() {
            // Include necessário para carregar as transações junto, evitando N+1 queries no cálculo dos totais
            return await _context.People
                .Include(p => p.Transactions)
                .ToListAsync();
        }
    }
}