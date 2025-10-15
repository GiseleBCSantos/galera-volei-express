import { v4 as uuid } from "uuid";
import {
  Partida,
  STATUS_PARTIDA,
  TIPO_ESCOLHA_TIME,
  TIPO_PARTIDA,
} from "../models/partida_model";

export const partidas: Array<Partida> = [
  {
    id: "1",
    nome: "Partida 1",
    adminId: "1",
    data_partida: new Date(),
    arenaId: "1",
    jogadoresIds: ["1", "3"],
    status: STATUS_PARTIDA.AGENDADA,
    tipo: TIPO_PARTIDA.PUBLICA,
    tipo_escolha_time: TIPO_ESCOLHA_TIME.ESCOLHA_JOGADOR,
    timeA: {
      timeAPlanejamento: [],
      jogadoresIds: [],
      placar: 0,
    },
    timeB: {
      timeBPlanejamento: [],
      jogadoresIds: [],
      placar: 0,
    },
  },
  {
    id: uuid(),
    nome: "Partida 2",
    adminId: "1",
    data_partida: new Date(),
    arenaId: "2",
    jogadoresIds: ["3", "4"],
    status: STATUS_PARTIDA.AGENDADA,
    tipo: TIPO_PARTIDA.PUBLICA,
  },
  {
    id: "3",
    nome: "Partida 3",
    adminId: "1",
    data_partida: new Date(),
    arenaId: "3",
    jogadoresIds: ["5", "1"],
    status: STATUS_PARTIDA.AGENDADA,
    tipo: TIPO_PARTIDA.PRIVADA,
  },
];
