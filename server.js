import pictureRoutes from "./routes/pictureRoutes.js";
import randomRoutes from "./routes/randomRoutes.js";
import manyRoutes from "./routes/manyRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar uploads como um diretório público
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({origin: "*",}));
app.use(express.json());
app.use("/img", pictureRoutes);
app.use("/random", randomRoutes);
app.use("/many", manyRoutes);
app.use("/user", userRoutes);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
