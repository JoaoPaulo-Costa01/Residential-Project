namespace Residential.Api.Models {
    public class Person {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }

        // Propriedade de navegação: permite ao EF Core carregar automaticamente todas as transações desta pessoa.
        public ICollection<Transaction> Transactions { get; set; }

        public Person() {
            // Evita NullReferenceException ao acessar a coleção antes de qualquer transação existir
            Transactions = new List<Transaction>();
        }
    }
}
