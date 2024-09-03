import { Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";

export default class EventoController {
  listarEventos(req: Request, res: Response) {
    const { maxPreco } = req.query;

    let eventosFiltrados = bancoDeDados.eventos;

    if (maxPreco !== undefined) {
      const precoMaximo = parseInt(maxPreco as string);
      eventosFiltrados = eventosFiltrados.filter((e) => e.preco <= precoMaximo);
    }
    return res.status(200).json(eventosFiltrados);
  }
}
