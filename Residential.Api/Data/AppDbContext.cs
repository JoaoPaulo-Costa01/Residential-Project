using Microsoft.EntityFrameworkCore;
using Residential.Api.Models;

namespace Residential.Api.Data {
    public class AppDbContext : DbContext{
        public AppDbContext(DbContextOptions options) : base(options) {
        }

        public DbSet<Person> People { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Person>()
                .HasMany(p => p.Transactions)
                .WithOne(t => t.Person)
                .HasForeignKey(t => t.PersonId)
                // Ao deletar a pessoa, todas as suas transações são removidas junto (regra de negócio)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuração para resolver o aviso do decimal (18 dígitos, 2 casas decimais)
            modelBuilder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasPrecision(18, 2);

            base.OnModelCreating(modelBuilder);
        }
    }
}