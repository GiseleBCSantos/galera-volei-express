import { v4 as uuid } from "uuid";

export const jogadores: Array<Jogador> = [
  { id: uuid(), nome: "Ana", email: "ana@example.com", idade: 25, sexo: "F" },
  {
    id: uuid(),
    nome: "Bruno",
    email: "bruno@example.com",
    idade: 30,
    sexo: "M",
  },
  {
    id: uuid(),
    nome: "Carla",
    email: "carla@example.com",
    idade: 28,
    sexo: "F",
  },
  {
    id: uuid(),
    nome: "Daniel",
    email: "daniel@example.com",
    idade: 22,
    sexo: "M",
  },
  { id: "1", nome: "Eva", email: "eva@example.com", idade: 27, sexo: "F" },
  { id: "2", nome: "Eva1", email: "eva@example.com", idade: 27, sexo: "F" },
  { id: "3", nome: "Eva2", email: "eva@example.com", idade: 27, sexo: "F" },
  { id: "4", nome: "Eva3", email: "eva@example.com", idade: 27, sexo: "F" },
  { id: "5", nome: "Eva4", email: "eva@example.com", idade: 27, sexo: "F" },
];
