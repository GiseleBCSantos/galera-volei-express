import { v4 as uuid } from "uuid";
import { Partida, STATUS_PARTIDA } from "../models/partida_model";

export const partidas: Array<Partida> = [
  {
    id: "1",
    nome: "Partida 1",
    adminId: "1",
    data_partida: new Date(),
    arenaId: "1",
    jogadoresIds: ["1", "3"],
    status: STATUS_PARTIDA.AGENDADA,
  },
  {
    id: uuid(),
    nome: "Partida 2",
    adminId: "1",
    data_partida: new Date(),
    arenaId: "2",
    jogadoresIds: ["3", "4"],
    status: STATUS_PARTIDA.AGENDADA,
  },
  {
    id: uuid(),
    nome: "Partida 3",
    adminId: "1",
    data_partida: new Date(),
    arenaId: "3",
    jogadoresIds: ["5", "1"],
    status: STATUS_PARTIDA.AGENDADA,
  },
];
