using Microsoft.EntityFrameworkCore;
using Residential.Api.Data;
using Residential.Api.Interfaces;
using Residential.Api.Models;

namespace Residential.Api.Repositories {
    public class TransactionRepository : ITransactionRepository {
        private readonly AppDbContext _context;

        public TransactionRepository(AppDbContext context) {
            _context = context;
        }

        // Persiste a nova transação no banco de dados e retorna o objeto com o ID gerado pelo SQL Server
        public async Task<Transaction> AddAsync(Transaction transaction) {
            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        // Retorna o histórico completo de todas as transações cadastradas no sistema
        public async Task<IEnumerable<Transaction>> GetAllAsync() {
            return await _context.Transactions.ToListAsync();
        }

        // Filtra transações por dono, o que será essencial para montar os relatórios de totais posteriormente
        public async Task<IEnumerable<Transaction>> GetByPersonIdAsync(int personId) {
            return await _context.Transactions
                .Where(t => t.PersonId == personId)
                .ToListAsync();
        }

        // Busca uma única transação pelo seu identificador único
        public async Task<Transaction?> GetByIdAsync(int id) {
            return await _context.Transactions.FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}