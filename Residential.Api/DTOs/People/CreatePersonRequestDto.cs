using System.ComponentModel.DataAnnotations;

namespace Residential.Api.DTOs.People {
    public class CreatePersonRequestDto {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "O nome deve ter entre 2 e 50 caracteres.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "A idade é obrigatória.")]
        [Range(0, 130, ErrorMessage = "A idade deve estar entre 0 e 130 anos.")]
        public int Age { get; set; }
    }
}
