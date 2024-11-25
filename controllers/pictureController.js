import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPic = async (req, res) => {
  try {
    // Certifique-se de enviar 'name' no corpo da requisição
    const file = req.file;
    const name = req.file.filename;

    if (!name || !file) {
      return res
        .status(400)
        .json({ error: "O campo 'name' e o arquivo são obrigatórios." });
    }

    const newPic = await prisma.midia.create({
      data: {
        name: name,
        src: file.path.replace(/\\/g, "/"), // Corrige o caminho para o formato correto
        type: req.file.mimetype,
        description: req.body.description || "", // Descrição opcional
      },
    });

    res.status(201).json({ pic: newPic, msg: "Imagem salva com sucesso!" });

  } catch (error) {
    return res.status(400).json({error: error.message });
  }
};


export const getPics = async (req, res) => {
  try {
    const pic = await prisma.midia.findMany();
    res.status(200).json(pic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPicsById = async (req, res) => {
  try {
    const pic = await prisma.midia.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!pic) {
      return res.status(404).json({ message: "Foto não encontrado!" });
    }

    res.status(200).json(pic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePic = async (req, res) => {
  try {
    const file = req.file;
    const name = req.file.filename;

    if (!name || !file) {
      return res
        .status(400)
        .json({ error: "O campo 'name' e o arquivo são obrigatórios." });
    }


    const pic = await prisma.midia.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: name,
        src: file.path.replace(/\\/g, "/"), // Corrige o caminho para o formato correto
        type: req.file.mimetype,
        description: req.body.description || "",
      },
    });
    res.status(200).json({ pic, msg: "Imagem atualizada com sucesso!" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

export const deletePic = async (req, res) => {
  try {
    await prisma.midia.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ message: "Foto deletada com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePics = async (req, res) => {
  try {

    const { ids } = req.body; 

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Nenhum ID fornecido para exclusão." });
    }
    // Executa a exclusão em massa usando Prisma
    await prisma.midia.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.status(200).json({ message: "Imagens deletadas com sucesso!" });
  } catch (err) {
    console.error(err); // Exibe o erro no console para debugging
    res.status(400).json({ error: err.message });
  }
};



// == PERIGO == PERIGO == PERIGO == PERIGO == PERIGO == PERIGO == PERIGO == PERIGO == PERIGO
// DELETA TODAS AS IMAGENS DO BD

// const deleteAllPics = async () => {
//   try {
//     // Deleta todas as imagens da tabela 'midia'
//     await prisma.midia.deleteMany({});
//     console.log("Todas as imagens foram deletadas com sucesso!");
//   } catch (error) {
//     console.error("Erro ao deletar as imagens:", error.message);
//   }
// };

// // Chama a função
// deleteAllPics();
 
