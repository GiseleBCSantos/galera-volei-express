export const STATUS_PARTIDA = {
  AGENDADA: "agendada",
  EM_ANDAMENTO: "em_andamento",
  FINALIZADA: "finalizada",
} as const;

export const TIPO_PARTIDA = {
  PUBLICA: "publica",
  PRIVADA: "privada",
} as const;

export const TIPO_ESCOLHA_TIME = {
  ALEATORIO: "aleatorio",
  ESCOLHA_JOGADOR: "escolha_jogador",
  MANUAL: "manual",
} as const;

export interface Partida extends BaseModel {
  id: string;
  nome: string;
  data_partida: Date;
  arenaId: string;
  adminId: string;
  jogadoresIds: string[];
  num_max_jogadores?: number;
  status: (typeof STATUS_PARTIDA)[keyof typeof STATUS_PARTIDA];
  tipo: (typeof TIPO_PARTIDA)[keyof typeof TIPO_PARTIDA];
  tipo_escolha_time?: (typeof TIPO_ESCOLHA_TIME)[keyof typeof TIPO_ESCOLHA_TIME];
  timeA?: {
    timeAPlanejamento: string[];
    jogadoresIds: string[];
    placar: number;
  };
  timeB?: {
    timeBPlanejamento: string[];
    jogadoresIds: string[];
    placar: number;
  };
  vencedor?: "A" | "B" | "empate";
}
