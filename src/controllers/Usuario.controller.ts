import { Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";
import TUsuario from "../types/Usuario";
import { v4 as uuidv4 } from "uuid";
import criptografarSenha from "../utils/criptografia";
import fraseSecreta from "../fraseSecreta";

export default class UsuarioController {
  cadastro(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    const novoUsuario: TUsuario = {
      id: uuidv4(),
      nome,
      email,
      senha: criptografarSenha(senha),
    };

    bancoDeDados.usuarios.push(novoUsuario);

    return res
      .status(201)
      .json({ id: novoUsuario.id, nome: nome, email: email });
  }

  login(req: Request, res: Response) {
    const { email } = req.body;

    const usuario = bancoDeDados.usuarios.find((u) => u.email === email);

    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não cadastrado" });
    }

    const usuarioID = usuario?.id;

    const comprovante = fraseSecreta + "/" + usuarioID;

    return res.status(200).json({ comprovante: comprovante });
  }
}
