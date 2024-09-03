import { NextFunction, Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";
import criptografarSenha from "../utils/criptografia";

export default class UsuarioMiddleware {
  validarLogin(req: Request, res: Response, next: NextFunction) {
    const { senha, email } = req.body;

    const usuario = bancoDeDados.usuarios.find(
      (usuario) => usuario.email === email
    );

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    if (!usuario) {
      return res.status(400).json({
        mensagem: "E-mail ou senha inválidos",
      });
    }

    if (usuario.senha !== criptografarSenha(senha)) {
      return res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
    }

    next();
  }

  validarUsuario(req: Request, res: Response, next: NextFunction) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    const usuarioExistente = bancoDeDados.usuarios.find(
      (u) => u.email === email
    );

    if (usuarioExistente) {
      return res.status(400).json({
        mensagem: "E-mail já cadastrado",
      });
    }
    next();
  }
}
