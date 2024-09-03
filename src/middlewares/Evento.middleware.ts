import { NextFunction, Request, Response } from "express";

export default class EventoMiddleware {
  precoMaximo(req: Request, res: Response, next: NextFunction) {
    const { maxPreco } = req.query;

    if (maxPreco !== undefined) {
      if (
        !/^\d+$/.test(maxPreco as string) ||
        parseInt(maxPreco as string) <= 0 ||
        maxPreco === undefined ||
        !maxPreco
      ) {
        return res.status(400).json({
          mensagem:
            "O preço máximo do evento deve conter apenas números e deve ser positivo",
        });
      }
    }

    next();
  }
}
