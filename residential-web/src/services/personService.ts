import api from "./api";
import type { PersonDto, CreatePersonRequestDto } from "../types/Person";

//Busca a lista completa de pessoas cadastradas no sistema.
export async function getAllPeople(): Promise<PersonDto[]> {
  const response = await api.get<PersonDto[]>("/people");
  return response.data;
}

// Envia os dados para cadastrar uma nova pessoa no banco de dados.
export async function createPerson(data: CreatePersonRequestDto): Promise<PersonDto> {
  const response = await api.post<PersonDto>("/people", data);
  return response.data;
}

//Remove uma pessoa do sistema pelo seu identificador único.
//Nota: Devido ao Cascade Delete na API, suas transações também serão removidas.
export async function deletePerson(id: number): Promise<void> {
  await api.delete(`/people/${id}`);
}