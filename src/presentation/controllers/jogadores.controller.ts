import { Request, Response } from "express";
import { GetAllJogadoresQuery } from "../../application/queries/jogador/get_all_jogadores.query";
import { CreateJogadorQuery } from "../../application/queries/jogador/create_jogador.query";
import { DeleteJogadorQuery } from "../../application/queries/jogador/delete_jogador.query";
import { UpdateJogadorQuery } from "../../application/queries/jogador/update_jogador.query";
import { CreateArena } from "../../application/queries/arena/create_arena.query";
import { GetArenaById } from "../../application/queries/arena/get_arena_by_id.query";
import { GetJogadorByIdQuery } from "../../application/queries/jogador/get_jogador_by_id.query";
import { NotFoundHTTPException } from "../exceptions/NotFoundHTTPException";
import { DeleteArena } from "../../application/queries/arena/delete_arena.query";
import { HTTPException } from "../exceptions/HTTPException";
import { ObjectNotFound } from "../exceptions/ObjectNotFount";
import { InvalidValuesException } from "../exceptions/InvalidValuesException";
import { JogadorEntraPartidaQuery } from "../../application/queries/jogador/jogador_entra_partida.query";
import { ConvidarParaPartidaQuery } from "../../application/queries/jogador/convidar_para_partida.query";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";

export class JogadoresController {
  private getAllJogadoresQuery: GetAllJogadoresQuery;
  private getJogadorByIdQuery: GetJogadorByIdQuery;
  private createJogadorQuery: CreateJogadorQuery;
  private updateJogadorQuery: UpdateJogadorQuery;
  private deleteJogadorQuery: DeleteJogadorQuery;
  private jogadorEntraPartidaQuery: JogadorEntraPartidaQuery;
  private convidarParaPartidaQuery: ConvidarParaPartidaQuery;

  constructor() {
    this.getAllJogadoresQuery = new GetAllJogadoresQuery();
    this.getJogadorByIdQuery = new GetJogadorByIdQuery();
    this.createJogadorQuery = new CreateJogadorQuery();
    this.updateJogadorQuery = new UpdateJogadorQuery();
    this.deleteJogadorQuery = new DeleteJogadorQuery();
    this.jogadorEntraPartidaQuery = new JogadorEntraPartidaQuery();
    this.convidarParaPartidaQuery = new ConvidarParaPartidaQuery();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const jogadores = this.getAllJogadoresQuery.execute();
      return res.status(200).json(jogadores);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public createOne = async (req: Request, res: Response) => {
    try {
      const { nome, email, sexo, idade } = req.body;
      const newJogador = this.createJogadorQuery.execute(
        nome,
        email,
        idade,
        sexo
      );
      return res.status(201).json(newJogador);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const jogador = this.getJogadorByIdQuery.execute(id);
      return res.status(200).json(jogador);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public updateOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nome, email, sexo, idade } = req.body;

      const updatedJogador = this.updateJogadorQuery.execute(
        id,
        nome,
        email,
        idade,
        sexo
      );

      if (!updatedJogador) {
        throw new NotFoundHTTPException(`Jogador com id ${id} não encontrado`);
      }

      return res.status(200).json(updatedJogador);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public deleteOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      this.deleteJogadorQuery.execute(id);
      return res.status(204).send();
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public jogadorEntraPartida = async (req: Request, res: Response) => {
    try {
      const { jogadorId, partidaId } = req.params;

      const partidaAtualizada = this.jogadorEntraPartidaQuery.execute(
        jogadorId,
        partidaId
      );

      return res.status(200).json(partidaAtualizada);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public convidarParaPartida = async (req: Request, res: Response) => {
    try {
      const { jogadorAnfitriaoId, jogadorConvidadoId, partidaId } = req.params;

      const partidaAtualizada = this.convidarParaPartidaQuery.execute(
        jogadorAnfitriaoId,
        jogadorConvidadoId,
        partidaId
      );
      return res.status(200).json(partidaAtualizada);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown) {
    if (error instanceof NotFoundHTTPException) {
      return res.status(404).json({ message: error.message });
    }

    if (error instanceof HTTPException) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof ObjectNotFound) {
      return res.status(404).json({ message: error.message });
    }

    if (error instanceof InvalidValuesException) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof UnauthorizedException) {
      return res.status(401).json({ message: error.message });
    }

    console.error("Erro inesperado:", error);
    return res.status(500).json({
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
}
