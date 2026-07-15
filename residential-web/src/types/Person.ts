export interface PersonDto {
  id: number;
  name: string;
  age: number;
}

export interface CreatePersonRequestDto {
  name: string;
  age: number;
}