import { Router } from "express";
import { JogadoresController } from "../controllers/jogadores.controller";

export const jogadores_router = Router();
const jogadores_controller = new JogadoresController();

jogadores_router.get("/", jogadores_controller.getAll);
jogadores_router.get("/:id", jogadores_controller.findById);
jogadores_router.post("/", jogadores_controller.createOne);
jogadores_router.put("/:id", jogadores_controller.updateOne);
jogadores_router.delete("/:id", jogadores_controller.deleteOne);
jogadores_router.post(
  "/:jogadorId/partidas/:partidaId",
  jogadores_controller.jogadorEntraPartida
);
