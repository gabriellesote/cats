import express from "express";
import {
  createPic,
  getPics,
  getPicsById,
  updatePic,
  deletePic
} from "../controllers/pictureController.js";
import upload from "../config/multer.js";
import { generateToken, validateToken } from "../config/token_gen.js";

const router = express.Router();

// Rota para upload de imagens - proteção com token
router.post("/upload", validateToken, upload.single("file"), createPic, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ message: "File uploaded successfully", file: req.file });
});

// Rota para listar todas as imagens - proteção com token
router.get("", validateToken, getPics);

// Rota para buscar imagem por id - proteção com token
router.get("/:id", validateToken, getPicsById);

// Rota para atualizar imagem - proteção com token
router.put("/update/:id", validateToken, upload.single("file"), updatePic);

// Rota para deletar imagem - proteção com token
router.delete("/:id", validateToken, deletePic);

// Rota para gerar token
router.post('/genToken', generateToken);

// Rota para listar imagens - se desejado, pode ser pública, sem validação de token
// router.post('/list', validateToken); // caso você queira também proteger essa rota com token

export default router;