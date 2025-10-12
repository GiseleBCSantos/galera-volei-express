import request from "supertest";
import app from "../server";

describe("Teste da API de Jogadores", () => {
  it("Deve retornar todos os jogadores", async () => {
    const response = await request(app).get("/jogadores");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("Deve retornar um jogador específico por ID", async () => {
    const response = await request(app).get("/jogadores/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "1");
  });

  it("Deve criar um novo jogador", async () => {
    const novoJogador = {
      nome: "Novo Jogador",
      email: "novo.jogador@example.com",
      idade: 25,
      sexo: "M",
    };
    const response = await request(app).post("/jogadores/").send(novoJogador);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toMatchObject(novoJogador);
  });

  it("Deve atualizar um jogador existente", async () => {
    const atualizacao = {
      nome: "Jogador Atualizado",
      email: "jogador.atualizado@example.com",
      idade: 30,
      sexo: "F",
    };
    const response = await request(app).put("/jogadores/1").send(atualizacao);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "1");
    expect(response.body).toMatchObject(atualizacao);
  });

  it("Deve deletar um jogador existente", async () => {
    const response = await request(app).delete("/jogadores/1");
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("Deve retornar 404 para jogador não encontrado", async () => {
    const response = await request(app).get("/jogadores/9999");
    expect(response.status).toBe(404);
  });

  it("Deve retornar 404 para jogador não encontrado", async () => {
    const response = await request(app).get("/jogadores/9999");
    expect(response.status).toBe(404);
  });

  it("Deve retornar 400 para dados inválidos ao criar um jogador", async () => {
    const jogadorInvalido = {
      nome: "",
      email: "emailinvalido",
      idade: -5,
      sexo: "X",
    };
    const response = await request(app)
      .post("/jogadores")
      .send(jogadorInvalido);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Dados inválidos para criar um jogador"
    );
  });

  it("Deve retornar 400 para dados inválidos ao atualizar um jogador", async () => {
    const jogadorInvalido = {
      nome: "",
      email: "emailinvalido",
      idade: -5,
      sexo: "X",
    };
    const response = await request(app)
      .put("/jogadores/1")
      .send(jogadorInvalido);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Dados inválidos para atualizar o jogador"
    );
  });

  it("Deve retornar 404 ao atualizar um jogador inexistente", async () => {
    const atualizacao = {
      nome: "Jogador Inexistente",
      email: "jogador.inexistente@example.com",
      idade: 30,
      sexo: "F",
    };
    const response = await request(app)
      .put("/jogadores/9999")
      .send(atualizacao);
    expect(response.status).toBe(404);
  });
  it("Deve retornar 404 ao deletar um jogador inexistente", async () => {
    const response = await request(app).delete("/jogadores/9999");
    expect(response.status).toBe(404);
  });

  it("Deve permitir que um jogador entre em uma partida", async () => {
    const response = await request(app).post("/jogadores/1/partidas/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "1");
    expect(response.body.jogadoresIds).toContain("1");
  });
});
