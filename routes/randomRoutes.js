import express from "express";
import { fileURLToPath } from "url";
import path from "path";

import {  validateToken} from "../config/token.js";
import {random} from "../controllers/random.js"
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.get("/img", random, express.static(path.join(__dirname, "uploads")));

export default router;