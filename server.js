import express from "express";
import pictureRoutes from "./routes/pictureRoutes.js";
import cors from "cors"
import randomRoutes from "./routes/randomRoutes.js"
import manyRoutes from "./routes/manyRoutes.js"
 

const app = express();
const port = 3000;


app.use(express.json());

app.use("/img",pictureRoutes)
app.use("/random",randomRoutes)
app.use("/many",manyRoutes)
app.use(cors());

 

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));