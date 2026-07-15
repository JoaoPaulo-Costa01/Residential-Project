import { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { extractErrorMessage } from "../../utils/errorHandling";
import { TransactionTypeValues } from "../../types/Transaction";
import type {
  CreateTransactionRequestDto,
  TransactionType,
} from "../../types/Transaction";
import type { PersonDto } from "../../types/Person";

interface TransactionFormProps {
  //Função chamada com os dados do formulário ao cadastrar uma nova transação
  onSubmit: (data: CreateTransactionRequestDto) => Promise<void>;
  //Lista de moradores usada para popular o combo-box de seleção
  people: PersonDto[];
}

//Opções fixas exibidas no combo-box de tipo de transação 
const TYPE_OPTIONS = [
  { value: TransactionTypeValues.Expense, label: "Despesa" },
  { value: TransactionTypeValues.Income, label: "Receita" },
];

/**
 * Formulário inline para cadastro de uma nova transação
 * (Descrição, Valor, Tipo e Morador). Mantém o próprio estado dos campos
 * e exibe erros de negócio vindos da API (ex: menor de idade cadastrando
 * receita) abaixo do botão de envio.
 */
export function TransactionForm({ onSubmit, people }: TransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>(
    TransactionTypeValues.Expense
  );
  const [personId, setPersonId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({
        description,
        amount: Number(amount),
        type,
        personId: Number(personId),
      });
      setDescription("");
      setAmount("");
      setType(TransactionTypeValues.Expense);
      setPersonId("");
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
        <div className="lg:col-span-2">
          <Input
            id="transaction-description"
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Supermercado"
            required
          />
        </div>

        <Input
          id="transaction-amount"
          label="Valor"
          type="number"
          step="0.01"
          min={0.01}
          max={100000}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0,00"
          required
        />

        <Select
          id="transaction-type"
          label="Tipo"
          options={TYPE_OPTIONS}
          value={type}
          onChange={(e) => setType(Number(e.target.value) as TransactionType)}
        />

        <Select
          id="transaction-person"
          label="Morador"
          options={people.map((person) => ({
            value: person.id,
            label: person.name,
          }))}
          placeholder="Selecione"
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
          required
        />
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adicionando..." : "Adicionar transação"}
        </Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}