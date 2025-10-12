import { Router } from "express";
import { ArenasController } from "../controllers/arenas.controller";

export const arena_router = Router();
const arena_controller = new ArenasController();

arena_router.get("/", arena_controller.getAll);
// arena_router.get("/two", arena_controller.getAll2);
// arena_router.get("/three", arena_controller.getAll3);
arena_router.get("/:id", arena_controller.findById);
arena_router.post("/", arena_controller.createOne);
arena_router.put("/:id", arena_controller.updateOne);
arena_router.delete("/:id", arena_controller.deleteOne);
