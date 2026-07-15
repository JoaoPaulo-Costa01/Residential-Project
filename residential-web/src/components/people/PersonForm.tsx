import { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { extractErrorMessage } from "../../utils/errorHandling";
import type { CreatePersonRequestDto } from "../../types/Person";

interface PersonFormProps {
  //Função chamada com os dados do formulário ao cadastrar um novo morador
  onSubmit: (data: CreatePersonRequestDto) => Promise<void>;
}

/**
 * Formulário inline para cadastro de um novo morador (Nome e Idade).
 * Mantém o próprio estado dos campos e exibe eventuais erros retornados
 * pela API (ex: falha de validação) abaixo do botão de envio.
 */
export function PersonForm({ onSubmit }: PersonFormProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({ name, age: Number(age) });
      setName("");
      setAge("");
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            id="person-name"
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do morador"
            required
          />
        </div>

        <div className="w-full sm:w-32">
          <Input
            id="person-age"
            label="Idade"
            type="number"
            min={0}
            max={130}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Idade"
            required
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adicionando..." : "Adicionar morador"}
        </Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}