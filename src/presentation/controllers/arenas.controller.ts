import { Request, Response } from "express";
import { GetAllArenasQuery } from "../../application/queries/arena/get_all_arenas.query";
import { HTTPException } from "../exceptions/HTTPException";
import { arenas } from "../../application/repositories/arena_repository";
import { v4 as uuid } from "uuid";

export class ArenasController {
  constructor() {}

  public getAll = async (req: Request, res: Response) => {
    const { zona } = req.query;
    const arenas = await new GetAllArenasQuery().execute(String(zona));

    return res.status(200).json(arenas);
  };

  public getAll2 = async (req: Request, res: Response) => {
    const { zona } = req.query;
    const arenas = new GetAllArenasQuery().execute(String(zona));

    return res.status(200).json(arenas);
  };

  public getAll3 = async (req: Request, res: Response) => {
    const { zona } = req.query;

    throw new HTTPException("Tá tudo ok, amigo", 400);

    const arenas = new GetAllArenasQuery().execute(String(zona));

    return res.status(200).json(arenas);
  };

  public createOne = async (req: Request, res: Response) => {
    const { nome, zona } = req.body;

    const arena = { id: uuid(), nome, zona };

    arenas.push(arena);

    return res.status(201).json(arena);
  };

  public findById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const arena = arenas.find((arena) => arena.id === id);

    if (!arena) {
      throw new HTTPException(`Não há uma arena com id = (${id})`, 404);
    }
    return res.status(200).json(arena);
  };
}
