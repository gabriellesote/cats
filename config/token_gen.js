import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const SECRET_KEY = process.env.JWT_SECRET || "gatinhos";

export const generateToken = async (req, res) => {
  try {
    // Define o payload (informações dentro do token)
    const payload = { service: 'cat'};
    const options = { expiresIn: '24h' };

    // Gera o token assinado
    const token = jwt.sign(payload, SECRET_KEY, options);

    res.status(200).json({ 
      token, 
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) 
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar token', details: error.message });
  }
};

export const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    // Verifique se o cabeçalho de autorização existe e tem o prefixo "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      
      return res.status(401).json({ error: 'Token ausente ou malformado' });
    }

    // Extraímos o token do cabeçalho
    const token = authHeader.split(' ')[1];

    // Verificar se o token é válido
    const decoded = jwt.verify(token, SECRET_KEY);

    // Anexar o payload decodificado ao objeto da requisição, se necessário
    req.user = decoded;

    // Proseguir para a próxima etapa
    next();  
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: 'Token inválido ou expirado', details: error.message });
  }
};