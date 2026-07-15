import { useEffect, useState } from "react";
import { PersonForm } from "../components/people/PersonForm";
import { PeopleTable } from "../components/people/PeopleTable";
import { getAllPeople, createPerson, deletePerson } from "../services/personService";
import type { PersonDto, CreatePersonRequestDto } from "../types/Person";

/**
 * Tela de gestão de moradores. Busca a lista de pessoas ao carregar
 * e mantém o estado local sincronizado após cada criação ou exclusão,
 * evitando uma nova requisição completa a cada ação.
 */
export function PeoplePage() {
  const [people, setPeople] = useState<PersonDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPeople() {
      const data = await getAllPeople();
      setPeople(data);
      setIsLoading(false);
    }

    fetchPeople();
  }, []);

  //Cadastra um novo morador e insere o resultado no estado local
  async function handleCreatePerson(data: CreatePersonRequestDto) {
    const created = await createPerson(data);
    setPeople((current) => [...current, created]);
  }

  //Remove um morador e o retira do estado local após sucesso na API
  async function handleDeletePerson(id: number) {
    await deletePerson(id);
    setPeople((current) => current.filter((person) => person.id !== id));
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold text-slate-900">Moradores</h1>

      <PersonForm onSubmit={handleCreatePerson} />

      {isLoading ? (
        <p className="text-sm text-slate-500">Carregando moradores...</p>
      ) : (
        <PeopleTable people={people} onDelete={handleDeletePerson} />
      )}
    </div>
  );
}