import { v4 as uuid } from "uuid";
import { Arena } from "../models/arena_model";

export const arenas: Array<Arena> = [
  { id: uuid(), nome: "THE Beach", zona: "Leste" },
  { id: uuid(), nome: "Arena Praia", zona: "Sul" },
  { id: uuid(), nome: "Arena Central", zona: "Centro" },
  { id: "1", nome: "Arena Ypê 2", zona: "Norte" },
  { id: uuid(), nome: "Arena Ypê", zona: "Norte" },
  {
    id: uuid(),
    nome: "Arena A",
    zona: "Norte",
    endereco: "Rua A",
    geolocalizacao: "-23.55052,-46.633308",
  },
];
