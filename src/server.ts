import express from "express";
import { log_middleware } from "./presentation/middlewares/log_middleware";
import { routes } from "./presentation/routes";

const app = express();

app.use(express.json());

app.use(log_middleware);

app.use(routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em  http://localhost:${PORT}`);
});

export default app;
