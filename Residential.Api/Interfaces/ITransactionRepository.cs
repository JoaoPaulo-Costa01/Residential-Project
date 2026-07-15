using Residential.Api.Models;

namespace Residential.Api.Interfaces {
    public interface ITransactionRepository {
        Task<Transaction> AddAsync(Transaction transaction);
        Task<IEnumerable<Transaction>> GetAllAsync();
        Task<IEnumerable<Transaction>> GetByPersonIdAsync(int personId);
        Task<Transaction?> GetByIdAsync(int id);
    }
}
