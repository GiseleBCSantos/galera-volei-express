import { Router } from "express";
import { arena_router } from "./rotas_arenas";
import { jogadores_router } from "./rotas_jogadores";
import { partidas_router } from "./rotas_partidas";

const router = Router();

router.use("/arenas", arena_router);
router.use("/jogadores", jogadores_router);
router.use("/partidas", partidas_router);

export { router as routes };
