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
});
