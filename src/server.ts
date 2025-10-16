import express from "express";
import { log_middleware } from "./presentation/middlewares/log_middleware";
import { routes } from "./presentation/routes";
import { translate_exception_middleware } from "./presentation/middlewares/translate_exception.middleware";

const app = express();

app.use(express.json());

app.use(routes);

app.use(translate_exception_middleware);
app.use(log_middleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em  http://localhost:${PORT}`);
});

export default app;
