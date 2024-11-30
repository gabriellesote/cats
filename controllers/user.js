import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../config/hashedPassword.js";
import { generateToken } from "../config/token.js";
const prisma = new PrismaClient();


export const registerUser = async (req, res) => {
  

  try {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Nome de usuário, email e senha são obrigatórios." });
    }
  
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado!' });
    }


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

    if (error.code === "P2002") {
        res.status(404).json({ msg: "Usuário com esse email já existe" });
    }

    res.status(500).json({ message: "Erro ao registrar o usuário.", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await prisma.user.findUnique({
      where: {email },
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ msg: "Senha incorreta" });
    }

    const { password: _, createdAt: __, token: ___, ...safeUser } = user;



    res.status(200).json({ msg: "Login bem-sucedido", safeUser });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Email ou senha inválidos.",
    });
  }
};

// -----------------------------
// Endpoints para update e delete

export const updateUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { email: email },
      data: req.body,
    });

    res.status(200).json({ msg: "Update bem sucedio: ", user });
  } catch (error) {
    console.log(error);

    if (error.code === "P2025") {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    res.status(500).json({
      message: "Erro ao atualizar",
    });
  }
};

export const deleteUser = async (req, res) => {
try{
  const { email } = req.body;
  const deleteUser = await prisma.user.delete({
    where: { email: email }
  });



  res.status(200).json({ msg: "Usuário deletado com sucesso", deletedUser });
}
catch(error){

  if (error.code === "P2025") {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }

  res.status(500).json({error, message: "Erro ao deletar" });
}




}


export const getUser = async (req, res) => {
  try{
    const { email } = req.body;

   

    const user = await prisma.user.findUnique({where: {email: email}, select:{
      id: true,
      username: true,
      email: true,
      token: true,
    }});

    res.status(200).json({ user });
  } 
  catch(error){
    res.status(500).json({error, message: "Erro ao buscar" });
  }
}