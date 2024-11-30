import express from 'express';
import upload from '../config/multer.js';  // Aponte para o arquivo de configuração do multer
import { manyPic } from '../controllers/manyPics.js';  // O controlador de upload em massa
import {  validateToken} from "../config/token.js";
const router = express.Router();

// Rota para upload de várias imagens
router.post('/uploadmany', upload.array('files', 25), manyPic, validateToken); // O nome do campo é 'files', pode ser alterado

export default router;
