import express from "express";
import pictureRoutes from "./routes/pictureRoutes.js";
const app = express();
const port = 3000;


app.use(express.json());

app.use("/img",pictureRoutes)


 

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));