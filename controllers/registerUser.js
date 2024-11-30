import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../util/hashedPassword.js";
import {createToken,saveToken} from '../config/token.js';
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    
    const user = await prisma.user.create({
      data:{
        name,
        email,
        password: hashedPassword
      }
    })

    const token = createToken(user.id);
    saveToken(token);

    await prisma.user.update({
      where: { id: user.id },
      data: { tokenId: token.id }, // Associar o tokenId ao usuário
    });

    console.log(user, token)
  
    res.status(201).json({msg: "Criado com sucesso!"})

  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ msg: "Email já cadastrado!" });
    }
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ msg: "Erro ao criar usuário", error: error.message });
  }
};
