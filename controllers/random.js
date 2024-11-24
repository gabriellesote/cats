import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const random = async (req, res) => {
  try {
    const pics = await prisma.midia.findMany();

    if (pics.length === 0) {
      return res.status(404).json({ error: "No images found." });
    }

    // Escolha uma imagem aleatória
    const randomPic = pics[Math.floor(Math.random() * pics.length)];

    // Retorne a imagem aleatória
    res.status(200).json({ pic: randomPic });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};
