import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "gatinhos";
 
export const generateToken = async (user) =>{
  const token =  await jwt.sign({
     userId: user.id  
   },
   JWT_SECRET,
   { expiresIn: '7d'}
 );
  
 return token
 }
 
 
 export const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    // Verifique se o cabeçalho de autorização existe e tem o prefixo "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      
      return res.status(401).json({ error: 'Token ausente ou malformado' });
    }

    // Extraímos o token do cabeçalho
    const token = authHeader.split(' ')[1];

    // Verificar se o token é válido
    const decoded = jwt.verify(token, JWT_SECRET);

    // Anexar o payload decodificado ao objeto da requisição, se necessário
    req.user = decoded;

    // Proseguir para a próxima etapa
    next();  
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: 'Token inválido ou expirado', details: error.message });
  }
};


