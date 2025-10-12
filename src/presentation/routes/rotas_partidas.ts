import { Router } from "express";
import { PartidasController } from "../controllers/partidas.controller";

export const partidas_router = Router();
const partidas_controller = new PartidasController();

partidas_router.get("/", partidas_controller.getAll);
partidas_router.get("/:id", partidas_controller.findById);
partidas_router.post("/", partidas_controller.createOne);
partidas_router.put("/:id", partidas_controller.updateOne);
partidas_router.delete("/:id", partidas_controller.deleteOne);
partidas_router.patch("/:id/iniciar", partidas_controller.iniciarPartida);
