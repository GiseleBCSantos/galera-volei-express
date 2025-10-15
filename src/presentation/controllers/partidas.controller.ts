import { Request, Response } from "express";
import { GetAllPartidasQuery } from "../../application/queries/partida/get_all_partidas.query";
import { GetPartidaByIdQuery } from "../../application/queries/partida/get_partida_by_id.query";
import { CreatePartidaQuery } from "../../application/queries/partida/create_partida.query";
import { UpdatePartidaQuery } from "../../application/queries/partida/update_partida.query";
import { DeletePartidaQuery } from "../../application/queries/partida/delete_partida.query";
import { NotFoundHTTPException } from "../exceptions/NotFoundHTTPException";
import { HTTPException } from "../exceptions/HTTPException";
import { ObjectNotFound } from "../exceptions/ObjectNotFount";
import { InvalidValuesException } from "../exceptions/InvalidValuesException";
import { IniciarPartidaQuery } from "../../application/queries/partida/iniciar_partida.query";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";
import { JogadorEscolheTimeQuery } from "../../application/queries/partida/jogador_escolhe_time.query";
import { BusinessRuleException } from "../exceptions/BusinessRuleException";

export class PartidasController {
  private getAllPartidasQuery: GetAllPartidasQuery;
  private getPartidaByIdQuery: GetPartidaByIdQuery;
  private createPartidaQuery: CreatePartidaQuery;
  private updatePartidaQuery: UpdatePartidaQuery;
  private deletePartidaQuery: DeletePartidaQuery;
  private iniciarPartidaQuery: IniciarPartidaQuery;
  private jogadorEscolheTimeQuery: JogadorEscolheTimeQuery;

  constructor() {
    this.getAllPartidasQuery = new GetAllPartidasQuery();
    this.getPartidaByIdQuery = new GetPartidaByIdQuery();
    this.createPartidaQuery = new CreatePartidaQuery();
    this.updatePartidaQuery = new UpdatePartidaQuery();
    this.deletePartidaQuery = new DeletePartidaQuery();
    this.iniciarPartidaQuery = new IniciarPartidaQuery();
    this.jogadorEscolheTimeQuery = new JogadorEscolheTimeQuery();
  }

  public getAll = async (req: Request, res: Response) => {
    const { nome, data_partida, arenaId, adminId, num_max_jogadores, tipo } =
      req.query;
    try {
      const partidas = this.getAllPartidasQuery.execute(
        nome as string | undefined,
        data_partida as string | undefined,
        arenaId as string | undefined,
        adminId as string | undefined,
        num_max_jogadores as string | undefined,
        tipo as string | undefined
      );
      return res.status(200).json(partidas);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public createOne = async (req: Request, res: Response) => {
    try {
      const {
        nome,
        data_partida,
        arenaId,
        jogadoresIds,
        adminId,
        num_max_jogadores,
        tipo,
      } = req.body;
      const newPartida = this.createPartidaQuery.execute(
        adminId,
        nome,
        data_partida,
        arenaId,
        jogadoresIds,
        num_max_jogadores,
        tipo
      );
      return res.status(201).json(newPartida);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const partida = this.getPartidaByIdQuery.execute(id);
      return res.status(200).json(partida);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public updateOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nome, data_partida, arenaId, jogadoresIds } = req.body;

      const updatedPartida = this.updatePartidaQuery.execute(
        id,
        nome,
        data_partida,
        arenaId,
        jogadoresIds
      );

      if (!updatedPartida) {
        throw new NotFoundHTTPException(`Partida com id ${id} não encontrada`);
      }

      return res.status(200).json(updatedPartida);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public deleteOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      this.deletePartidaQuery.execute(id);
      return res.status(204).send();
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public iniciarPartida = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log("Iniciando partida com ID:", id);
      const partida = this.iniciarPartidaQuery.execute(id);

      return res.status(200).json(partida);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public jogadorEscolheTime = async (req: Request, res: Response) => {
    try {
      const { id: partidaId } = req.params;
      const { jogadorId, time } = req.body;
      const partida = this.jogadorEscolheTimeQuery.execute(
        partidaId,
        jogadorId,
        time
      );

      return res.status(200).json(partida);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown) {
    if (error instanceof ObjectNotFound) {
      return res.status(404).json({ message: error.message });
    }

    if (error instanceof InvalidValuesException) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof UnauthorizedException) {
      return res.status(401).json({ message: error.message });
    }
    if (error instanceof NotFoundHTTPException) {
      return res.status(404).json({ message: error.message });
    }

    if (error instanceof HTTPException) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof BusinessRuleException) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error("Erro inesperado:", error);
    return res.status(500).json({
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
}
