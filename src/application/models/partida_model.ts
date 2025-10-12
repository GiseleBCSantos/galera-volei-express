export const STATUS_PARTIDA = {
  AGENDADA: "agendada",
  EM_ANDAMENTO: "em_andamento",
  FINALIZADA: "finalizada",
} as const;

interface Partida extends BaseModel {
  id: string;
  nome: string;
  data_partida: Date;
  arenaId: string;
  adminId: string;
  jogadoresIds: string[];
  num_max_jogadores?: number;
  status?: (typeof STATUS_PARTIDA)[keyof typeof STATUS_PARTIDA];
}
