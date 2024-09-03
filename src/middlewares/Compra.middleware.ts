import { Request, Response, NextFunction } from "express";
import bancoDeDados from "../bancoDeDados";

export default class CompraMiddleware {
  validarCompra(req: Request, res: Response, next: NextFunction) {
    const { idEvento } = req.body;

    if (!idEvento) {
      return res
        .status(400)
        .json({ mensagem: "O identificador do evento é obrigatório" });
    }

    const evento = bancoDeDados.eventos.find((e) => e.id === idEvento);

    if (!evento) {
      return res.status(404).json({ mensagem: "Evento não encontrado" });
    }

    next();
  }

  deleteCompra(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { comprovante } = req.query;

    if (!comprovante || typeof comprovante !== "string") {
      return res.status(401).json({ mensagem: "Falha na autenticação" });
    }

    const [fraseSecretaCampo, usuarioID] = comprovante.split("/");

    const compra = bancoDeDados.compras.find((compra) => compra.id === id && compra.id_usuario === usuarioID);

    if (!compra) {
      return res.status(404).json({ mensagem: "Compra não encontrada" });
    }

    next();
  }
}
