import { Request, Response } from "express";
import { GetAllArenasQuery } from "../../application/queries/arena/get_all_arenas.query";
import { CreateArena } from "../../application/queries/arena/create_arena.query";
import { GetArenaById } from "../../application/queries/arena/get_arena_by_id.query";
import { UpdateArena } from "../../application/queries/arena/update_arena.query";
import { DeleteArena } from "../../application/queries/arena/delete_arena.query";
import { HTTPException } from "../exceptions/HTTPException";
import { NotFoundHTTPException } from "../exceptions/NotFoundHTTPException";
import { ObjectNotFound } from "../exceptions/ObjectNotFount";
import { InvalidValuesException } from "../exceptions/InvalidValuesException";

export class ArenasController {
  public getAll = async (req: Request, res: Response) => {
    try {
      const { nome, zona, endereco, geolocalizacao } = req.query;
      const arenas = new GetAllArenasQuery().execute(
        nome as string | undefined,
        zona as string | undefined,
        endereco as string | undefined,
        geolocalizacao as string | undefined
      );
      return res.status(200).json(arenas);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public createOne = async (req: Request, res: Response) => {
    try {
      const { nome, zona } = req.body;
      const newArena = new CreateArena().execute(nome, zona);
      return res.status(201).json(newArena);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const arena = new GetArenaById().execute(id);
      return res.status(200).json(arena);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public updateOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nome, zona, endereco, geolocalizacao } = req.body;

      const updatedArena = new UpdateArena().execute(
        id,
        nome,
        zona,
        endereco,
        geolocalizacao
      );

      if (!updatedArena) {
        throw new NotFoundHTTPException(`Arena com id ${id} não encontrada`);
      }

      return res.status(200).json(updatedArena);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  public deleteOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      new DeleteArena().execute(id);
      return res.status(204).send();
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

    console.error("Erro inesperado:", error);
    return res.status(500).json({
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
}
