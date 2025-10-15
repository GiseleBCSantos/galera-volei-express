import request from "supertest";
import app from "../server";
import {
  STATUS_PARTIDA,
  TIPO_ESCOLHA_TIME,
} from "../application/models/partida_model";
import { partidas } from "../application/repositories/partida_repository";

describe("Teste da API de Partidas", () => {
  beforeAll(() => {
    partidas.push(
      {
        id: "1",
        nome: "Partida 1",
        data_partida: new Date(),
        arenaId: "1",
        adminId: "1",
        jogadoresIds: ["1", "2"],
        num_max_jogadores: 10,
        status: STATUS_PARTIDA.AGENDADA,
        tipo_escolha_time: TIPO_ESCOLHA_TIME.ESCOLHA_JOGADOR,
        timeA: {
          timeAPlanejamento: [],
          jogadoresIds: [],
          placar: 0,
        },
        timeB: {
          timeBPlanejamento: [],
          jogadoresIds: [],
          placar: 0,
        },
        tipo: "publica",
      },
      {
        id: "2",
        nome: "Partida 2",
        data_partida: new Date(),
        arenaId: "2",
        adminId: "2",
        jogadoresIds: ["3", "4"],
        num_max_jogadores: 8,
        status: STATUS_PARTIDA.AGENDADA,
        tipo: "privada",
      },
      {
        id: "3",
        nome: "Partida 2",
        data_partida: new Date(),
        arenaId: "2",
        adminId: "2",
        jogadoresIds: ["3", "4"],
        num_max_jogadores: 8,
        status: STATUS_PARTIDA.EM_ANDAMENTO,
        tipo: "privada",
      }
    );
  });

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

  // Teste para filtros
  it("Deve filtrar partidas por nome", async () => {
    const response = await request(app).get("/partidas?nome=Partida 1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((partida: any) => {
      expect(partida.nome).toContain("Partida 1");
    });
  });

  it("Deve filtrar partidas por data", async () => {
    const data = new Date().toISOString().split("T")[0];
    const response = await request(app).get(`/partidas?data_partida=${data}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((partida: any) => {
      expect(new Date(partida.data_partida).toISOString().split("T")[0]).toBe(
        data
      );
    });
  });

  it("Deve filtrar partidas por arenaId", async () => {
    const response = await request(app).get("/partidas?arenaId=1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((partida: any) => {
      expect(partida.arenaId).toBe("1");
    });
  });

  it("Deve filtrar partidas por adminId", async () => {
    const response = await request(app).get("/partidas?adminId=1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((partida: any) => {
      expect(partida.adminId).toBe("1");
    });
  });
  it("Deve filtrar partidas por num_max_jogadores", async () => {
    const response = await request(app).get("/partidas?num_max_jogadores=10");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((partida: any) => {
      expect(partida.num_max_jogadores).toBe(10);
    });
  });

  it("Deve filtrar partidas por tipo", async () => {
    const response = await request(app).get("/partidas?tipo=publica");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((partida: any) => {
      expect(partida.tipo).toBe("publica");
    });
  });

  it("Deve filtrar partidas por múltiplos critérios", async () => {
    const data = new Date().toISOString().split("T")[0];
    const response = await request(app).get(
      `/partidas?adminId=1&arenaId=1&data_partida=${data}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((partida: any) => {
      expect(partida.adminId).toBe("1");
      expect(partida.arenaId).toBe("1");
      expect(new Date(partida.data_partida).toISOString().split("T")[0]).toBe(
        data
      );
    });
  });

  // Teste para escolha de time

  it("Deve permitir que um jogador escolha um time", async () => {
    const response = await request(app)
      .post("/partidas/1/escolher-time")
      .send({ jogadorId: "1", time: "A" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("timeA");
    expect(response.body.timeA.timeAPlanejamento).toContain("1");
    expect(response.body).toHaveProperty("timeB");
    expect(response.body.timeB.timeBPlanejamento).not.toContain("1");
  });
  it("Deve retornar erro ao tentar escolher time com parâmetros inválidos", async () => {
    const response = await request(app)
      .post("/partidas/1/escolher-time")
      .send({ jogadorId: "", time: "C" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Parâmetros inválidos");
  });
  it("Deve retornar erro ao tentar escolher time em partida inexistente", async () => {
    const response = await request(app)
      .post("/partidas/9999/escolher-time")
      .send({ jogadorId: "1", time: "A" });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "Partida com ID 9999 não encontrada."
    );
  });
  it("Deve retornar erro ao tentar escolher time com jogador inexistente", async () => {
    const response = await request(app)
      .post("/partidas/1/escolher-time")
      .send({ jogadorId: "9999", time: "A" });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "Jogador com id 9999 não encontrado"
    );
  });
  it("Deve retornar erro ao tentar escolher time com jogador não na partida", async () => {
    const response = await request(app)
      .post("/partidas/1/escolher-time")
      .send({ jogadorId: "3", time: "A" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Jogador não está na partida"
    );
  });
  it("Deve retornar erro ao tentar escolher time em partida não agendada", async () => {
    let response = await request(app).patch("/partidas/1/iniciar");
    expect(response.status).toBe(200);

    response = await request(app)
      .post("/partidas/1/escolher-time")
      .send({ jogadorId: "1", time: "A" });
    expect(response.status).toBe(400);
  });
  it("Deve retornar erro ao tentar escolher time em partida com tipo de escolha inválido", async () => {
    const response = await request(app)
      .post("/partidas/2/escolher-time")
      .send({ jogadorId: "3", time: "A" });
    expect(response.status).toBe(400);
  });
});
