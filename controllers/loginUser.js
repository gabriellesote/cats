import { PrismaClient } from "@prisma/client";
import { comparePassword } from "../util/hashedPassword.js";
const prisma = new PrismaClient();


export const login = async (req,res) =>{
  try{
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where:{email},
    });

    //verificando se existe o usuário
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    //verificando se a senha está correta
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Senha incorreta" });
    }
     


    res.status(200).json({ msg: "Login bem-sucedido", user });
  }
  catch(error){
    console.error(error);
    res.status(500).json({msg: "erro ao fazer login"});
  }
 
}