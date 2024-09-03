import { Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";
import { v4 as uuidv4 } from "uuid";

export default class CompraController {
  comprar(req: Request, res: Response) {
    const { idEvento, usuarioID } = req.body;

    const novaCompra = {
      id: uuidv4(),
      id_usuario: usuarioID,
      id_evento: idEvento,
    };

    bancoDeDados.compras.push(novaCompra);

    return res.status(201).json(novaCompra);
  }

  listarCompras(req: Request, res: Response) {
    const { comprovante } = req.query;

    if (!comprovante || typeof comprovante !== "string") {
      return res.status(400).json({ mensagem: "Falha na autenticação" });
    }
    const [fraseSecretaCampo, usuarioID] = comprovante.split("/");

    const comprasUsuario = bancoDeDados.compras
      .filter((compra) => compra.id_usuario === usuarioID)
      .map((compra) => {
        const evento = bancoDeDados.eventos.find(
          (e) => e.id === compra.id_evento
        );

        return {
          idCompra: compra.id,
          idEvento: evento?.id,
          nome: evento?.nome,
          endereco: evento?.endereco,
          data: evento?.data,
          preco: evento?.preco,
        };
      });

    return res.status(200).json(comprasUsuario);
  }

  deletar(req: Request, res: Response) {
    const { id } = req.params;

    bancoDeDados.compras = bancoDeDados.compras.filter(
      (compra) => compra.id !== id
    );

    return res.status(204).send();
  }
}
