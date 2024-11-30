import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const deleteAllPics = async () => {
  try {
    // Deleta todas as imagens da tabela 'midia'
    await prisma.midia.deleteMany({});
    console.log("Todas as imagens foram deletadas com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar as imagens:", error.message);
  }
};

deleteAllPics();
 

 
 