import request from "supertest";
import app from "../server";
import { STATUS_PARTIDA } from "../application/models/partida_model";

describe("Teste da API de Partidas", () => {
  it("Deve retornar todas as partidas", async () => {
    const response = await request(app).get("/partidas");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("Deve retornar uma partida específica por ID", async () => {
    const response = await request(app).get("/partidas/1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("Deve criar uma nova partida", async () => {
    const novaPartida = {
      nome: "Nova Partida",
      adminId: "1",
      data_partida: new Date(),
      arenaId: "1",
      jogadoresIds: ["1", "2"],
    };
    const response = await request(app).post("/partidas").send(novaPartida);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...novaPartida,
        data_partida: new Date(novaPartida.data_partida).toISOString(),
        status: STATUS_PARTIDA.AGENDADA,
      })
    );
  });
  it("Deve atualizar uma partida existente", async () => {
    const atualizacaoPartida = {
      nome: "Partida Atualizada",
      data_partida: new Date(),
      arenaId: "1",
      jogadoresIds: ["1", "2"],
    };
    const response = await request(app)
      .put("/partidas/1")
      .send(atualizacaoPartida);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...atualizacaoPartida,
        data_partida: new Date(atualizacaoPartida.data_partida).toISOString(),
      })
    );
  });
  it("Deve iniciar uma partida", async () => {
    const response = await request(app)
      .patch("/partidas/1/iniciar")
      .send({ status: STATUS_PARTIDA.EM_ANDAMENTO });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: STATUS_PARTIDA.EM_ANDAMENTO,
      })
    );
  });
  it("Deve deletar uma partida", async () => {
    const response = await request(app).delete("/partidas/1");
    expect(response.status).toBe(204);
  });
  it("Deve retornar 404 para partida não encontrada", async () => {
    const response = await request(app).get("/partidas/9999");
    expect(response.status).toBe(404);
  });
  it("Deve retornar 400 para criação de partida com dados inválidos", async () => {
    const partidaInvalida = {
      nome: "",
      data_partida: "data inválida",
      arenaId: "1",
      jogadoresIds: ["1", "2"],
    };
    const response = await request(app).post("/partidas").send(partidaInvalida);
    expect(response.status).toBe(400);
  });
  it("Deve retornar 400 para atualização de partida com dados inválidos", async () => {
    const partidaInvalida = {
      nome: "",
      data_partida: "data inválida",
      arenaId: "1",
      jogadoresIds: ["1", "2"],
    };
    const response = await request(app)
      .put("/partidas/1")
      .send(partidaInvalida);
    expect(response.status).toBe(400);
  });
  it("Deve retornar 404 ao tentar deletar uma partida inexistente", async () => {
    const response = await request(app).delete("/partidas/9999");
    expect(response.status).toBe(404);
  });
});
