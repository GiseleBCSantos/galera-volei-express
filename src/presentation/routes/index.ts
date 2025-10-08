import { Router } from "express";
import { arena_router } from "./rotas_arenas";

const router = Router();

router.use("/arenas", arena_router);

export { router as routes };
