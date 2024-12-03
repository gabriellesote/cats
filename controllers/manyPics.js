import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const manyPic = async (req, res) => {
  try {
    // Verifica se as imagens foram enviadas
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
    }

    const files = req.files;

    // Limita a quantidade de imagens a 25
    if (files.length > 100) {
      return res.status(400).json({ error: "Você pode enviar no máximo 25 imagens." });
    }

    // Array para armazenar as promessas de criação das imagens
    const imagePromises = files.map(async (file) => {
      const newPic = await prisma.midia.create({
        data: {
          name: file.filename,
          src: file.path.replace(/\\/g, "/"), // Corrige o caminho para o formato correto
          type: file.mimetype,
          description: req.body.description || "", // Descrição opcional
        },
      });

      return newPic; // Retorna o objeto da imagem salva
    });

    // Espera todas as imagens serem salvas
    const savedPics = await Promise.all(imagePromises);

    // Retorna a resposta com as imagens salvas
    res.status(201).json({
      msg: `${savedPics.length} imagens foram salvas com sucesso!`,
      pics: savedPics,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};