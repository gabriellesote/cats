import { PrismaClient } from "@prisma/client";
import {hashPassword}  from '../config/hashedPassword.js';
import { generateToken} from '../config/token.js';
const prisma = new PrismaClient();


export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;


  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Nome de usuário, email e senha são obrigatórios." });
  }

  try {
     const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword, // Armazenar a senha diretamente (use hashing em produção)
        token: "", // O token será gerado após a criação
      },
    });

    // Gera o token para o novo usuário
    const token = await generateToken(newUser);
    console.log(token.toString());

    await prisma.user.update({
      where: { id: newUser.id },
      data: { token: token },
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao registrar o usuário.", error });
  }
};

 