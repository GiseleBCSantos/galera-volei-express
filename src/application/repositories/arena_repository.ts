import { v4 as uuid } from "uuid";

export const arenas: Array<Arena> = [];
arenas.push({ id: uuid(), nome: "THE Beach", zona: "Leste" });
arenas.push({ id: uuid(), nome: "Arena Ypê", zona: "Norte" });
arenas.push({ id: "1", nome: "Arena Ypê 2", zona: "Norte" });
