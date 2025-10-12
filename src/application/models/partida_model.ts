export const STATUS_PARTIDA = {
  AGENDADA: "agendada",
  EM_ANDAMENTO: "em_andamento",
  FINALIZADA: "finalizada",
} as const;

export const TIPO_PARTIDA = {
  PUBLICA: "publica",
  PRIVADA: "privada",
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
}
