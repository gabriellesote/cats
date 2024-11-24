import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPic = async (req, res) => {
  try {
      // Certifique-se de enviar 'name' no corpo da requisição
    const file = req.file;
    const name = req.file.filename;

    if (!name || !file) {
      return res.status(400).json({ error: "O campo 'name' e o arquivo são obrigatórios." });
    }

    const newPic = await prisma.midia.create({
      data: {
        name : name,
        src: file.path.replace(/\\/g, "/"), // Corrige o caminho para o formato correto
        type: req.file.mimetype,
        description: req.body.description || "", // Descrição opcional
      },
    });

    res.status(201).json({ pic: newPic, msg: "Imagem salva com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPics = async (req, res) => {
  try{
    const pic = await prisma.midia.findMany();
    res.status(200).json(pic);


  }catch(error){
    res.status(400).json({error:error.message})
  }
}