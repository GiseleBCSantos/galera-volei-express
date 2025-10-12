import request from "supertest";
import app from "../server";
import { jogadores } from "../application/repositories/jogador_repository";
import { partidas } from "../application/repositories/partida_repository";

describe("Teste da API de Jogadores", () => {
  beforeEach(() => {
    jogadores.length = 0;
    partidas.length = 0;

    jogadores.push(
      { id: "1", nome: "Admin", email: "admin@mail.com", idade: 30, sexo: "M" },
      {
        id: "2",
        nome: "Convidado",
        email: "guest@mail.com",
        idade: 25,
        sexo: "F",
      },
      {
        id: "3",
        nome: "Random",
        email: "random@mail.com",
        idade: 30,
        sexo: "M",
      }
    );

    partidas.push({
      id: "1",
      nome: "Partida 1",
      data_partida: new Date(),
      arenaId: "arena1",
      adminId: "1",
      jogadoresIds: ["1", "3"],
      status: "agendada",
    });
  });

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

  it("Deve permitir que o administrador convide um jogador para a partida", async () => {
    const response = await request(app)
      .post("/jogadores/1/convidar/2/para/1/")
      .send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "1");
    expect(response.body.jogadoresIds).toContain("2");
  });

  it("Deve retornar 404 ao tentar convidar um jogador para uma partida inexistente", async () => {
    const response = await request(app)
      .post("/jogadores/1/convidar/2/para/9999")
      .send();
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Partida não encontrada");
  });

  it("Deve retornar 403 ao tentar convidar um jogador para uma partida sem ser o administrador", async () => {
    const response = await request(app)
      .post("/jogadores/2/convidar/1/para/1")
      .send();
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "message",
      "Apenas o administrador da partida pode convidar jogadores"
    );
  });

  it("Deve retornar 404 ao tentar convidar um jogador inexistente para uma partida", async () => {
    const response = await request(app)
      .post("/jogadores/1/convidar/9999/para/1")
      .send();
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "Jogador convidado não encontrado"
    );
  });

  it("Deve retornar 400 ao tentar convidar um jogador que já está na partida", async () => {
    const response = await request(app)
      .post("/jogadores/1/convidar/3/para/1")
      .send();
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Jogador já está na partida"
    );
  });

  it("Deve retornar 404 ao tentar convidar um jogador inexistente para uma partida", async () => {
    const response = await request(app)
      .post("/jogadores/1/convidar/9999/para/1")
      .send();
    expect(response.status).toBe(404);
  });
});
