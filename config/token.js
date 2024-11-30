import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "gatinhos";
// Defina isso no seu .env
export const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // Retorna os dados do token (ex: userId)
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expirado");
    }
    throw new Error("Token inválido");
  }
};

export const createToken = async (user) => {
  const expiresIn = "7d"; // Token válido por 7 dias
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn });
  // 7 dias
  return token ;
};

export const saveToken = async (token) => {
  try {
    
    const decoded = jwt.verify(token, JWT_SECRET);

    // Buscar o usuário pelo ID do token decodificado
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    // Criar um novo token associado ao usuário
    await prisma.token.create({
      data: {
        userId: user.id, // Usar user.id, e não o objeto completo `user`
        accessToken: token.token, // Apenas o valor do token
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Definir a data de expiração
      },
    });

    // Atualizar o usuário com o tokenId


    console.log("Token salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar o token:", error.message);
    throw error; // Lança o erro para ser tratado em outro lugar
  }
};
