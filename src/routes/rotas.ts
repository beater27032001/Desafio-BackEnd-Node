import { Router } from "express";
import EventoController from "../controllers/Evento.controller";
import EventoMiddleware from "../middlewares/Evento.middleware";
import UsuarioController from "../controllers/Usuario.controller";
import UsuarioMiddleware from "../middlewares/Usuario.middleware";
import ComprovanteMiddleware from "../middlewares/Comprovante.middleware";
import CompraMiddleware from "../middlewares/Compra.middleware";
import CompraController from "../controllers/Compra.controller";

const rotas = Router();

const usuario = new UsuarioController();
const validacaoUsuario = new UsuarioMiddleware();
const validacaoComprovante = new ComprovanteMiddleware().validarComprovante;
const validacaoCompra = new CompraMiddleware();
const compra = new CompraController();

rotas.get("/", (req, res) => {
  res.status(200).json({ mensagem: "API de vendas de ingressos" });
});

rotas.get(
  "/eventos",
  new EventoMiddleware().precoMaximo,
  new EventoController().listarEventos
);

rotas.post("/usuarios", validacaoUsuario.validarUsuario, usuario.cadastro);

rotas.post("/login", validacaoUsuario.validarLogin, usuario.login);

rotas.post(
  "/compras",
  validacaoComprovante,
  validacaoCompra.validarCompra,
  compra.comprar
);

rotas.get("/compras", validacaoComprovante, compra.listarCompras)

rotas.delete("/compras/:id", validacaoCompra.deleteCompra , validacaoComprovante, compra.deletar)

export default rotas;
