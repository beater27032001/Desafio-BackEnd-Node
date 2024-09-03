import { Request, Response, NextFunction } from "express";
import bancoDeDados from "../bancoDeDados";
import fraseSecreta from "../fraseSecreta";

export default class ComprovanteMiddleware {
  validarComprovante(req: Request, res: Response, next: NextFunction) {
    const { comprovante } = req.query;

    if (!comprovante || typeof comprovante !== "string") {
      return res.status(401).json({ mensagem: "Falha na autenticação" });
    }

    const [fraseSecretaCampo, usuarioID] = comprovante.split("/");

    if (fraseSecretaCampo !== fraseSecreta) {
      return res.status(401).json({ mensagem: "Falha na autenticação" });
    }

    const usuario = bancoDeDados.usuarios.find((u) => u.id === usuarioID);

    if (!usuario) {
      return res.status(401).json({ mensagem: "Falha na autenticação" });
    }

    req.body.usuarioID = usuarioID;

    next();
  }
}
