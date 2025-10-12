import request from "supertest";
import app from "../server";

describe("Testes da API de Arenas", () => {
  it("Deve retornar todas as arenas", async () => {
    const res = await request(app).get("/arenas");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve retornar uma arena específica por ID", async () => {
    const res = await request(app).get("/arenas/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", "1");
  });

  it("Deve retornar arenas filtradas por zona", async () => {
    const res = await request(app).get("/arenas?zona=Norte");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every((arena: any) => arena.zona === "Norte")).toBe(true);
  });

  it("Deve criar uma nova arena", async () => {
    const novaArena = {
      nome: "Arena Central",
      zona: "Sul",
    };

    const res = await request(app).post("/arenas").send(novaArena);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toMatchObject(novaArena);
  });

  it("Deve atualizar uma arena existente", async () => {
    const atualizacao = {
      nome: "Arena Atualizada",
      zona: "Leste",
      endereco: "Rua Exemplo, 123",
      geolocalizacao: "-23.55052,-46.633308",
    };

    const res = await request(app).put("/arenas/1").send(atualizacao);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", "1");
    expect(res.body).toMatchObject(atualizacao);
  });

  it("Deve deletar uma arena existente", async () => {
    const res = await request(app).delete("/arenas/1");
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  it("Deve retornar 404 ao buscar uma arena inexistente", async () => {
    const res = await request(app).get("/arenas/9999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty(
      "message",
      "Arena com id 9999 não encontrada"
    );
  });
  it("Deve retornar 404 ao atualizar uma arena inexistente", async () => {
    const atualizacao = {
      nome: "Arena Inexistente",
      zona: "Oeste",
    };
    const res = await request(app).put("/arenas/9999").send(atualizacao);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty(
      "message",
      "Arena com id 9999 não encontrada"
    );
  });
  it("Deve retornar 404 ao deletar uma arena inexistente", async () => {
    const res = await request(app).delete("/arenas/9999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty(
      "message",
      "Arena com id 9999 não encontrada"
    );
  });
});
