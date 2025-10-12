import { v4 as uuid } from "uuid";

export const partidas: Array<Partida> = [
  {
    id: "1",
    nome: "Partida 1",
    data_partida: new Date(),
    arenaId: "1",
    jogadoresIds: ["1", "2"],
  },
  {
    id: uuid(),
    nome: "Partida 2",
    data_partida: new Date(),
    arenaId: "2",
    jogadoresIds: ["3", "4"],
  },
  {
    id: uuid(),
    nome: "Partida 3",
    data_partida: new Date(),
    arenaId: "3",
    jogadoresIds: ["5", "1"],
  },
];
