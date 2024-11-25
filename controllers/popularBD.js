import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();// Supondo que você já tenha o Prisma configurado
import { v4 as uuidv4 } from 'uuid'; // Para gerar identificadores únicos
import { fileURLToPath } from 'url'; // Para obter o diretório atual
import { dirname } from 'path';

// Configuração do Multer para salvar os arquivos na pasta 'uploads/'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Verifica e cria a pasta 'uploads' se ela não existir
const ensureUploadsDirectoryExists = () => {
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir); // Cria a pasta
  }
};

// Função para processar os arquivos
const processFiles = async () => {
  try {
    // Caminho da pasta que você deseja ler os arquivos
    const folderPath = 'C:/Users/so251/Downloads/gatos'; // Caminho absoluto direto

    // Lê os arquivos na pasta
    fs.readdir(folderPath, async (err, files) => {
      if (err) {
        console.error('Erro ao ler a pasta:', err);
        return;
      }

      // Garante que a pasta de uploads existe
      ensureUploadsDirectoryExists();

      // Para cada arquivo na pasta
      for (const file of files) {
        const filePath = path.join(folderPath, file); // Caminho completo do arquivo

        // Verifica se o item é um arquivo e não uma subpasta
        if (fs.statSync(filePath).isFile()) {
          // Processa cada arquivo, movendo para a pasta 'uploads' e salvando no banco de dados

          // Definindo nome do arquivo para 'uploads'
          const uniqueName = `${uuidv4()}${path.extname(file)}`;

          // Caminho de destino para o arquivo
          const destinationPath = path.join(__dirname, 'uploads', uniqueName);

          // Verifica se o arquivo de origem existe
          if (fs.existsSync(filePath)) {
            // Copia o arquivo para a pasta de uploads
            fs.copyFileSync(filePath, destinationPath);

            // Salva as informações do arquivo no banco de dados
            const newPic = await prisma.midia.create({
              data: {
                name: uniqueName, // Nome único gerado para o arquivo
                src: destinationPath.replace(/\\/g, '/'), // Caminho da imagem
                type: path.extname(file), // Tipo do arquivo (extensão)
                description: 'Descrição opcional', // Descrição, você pode personalizar
              },
            });

            console.log(`Arquivo ${file} processado e salvo no banco.`);
          } else {
            console.log(`Arquivo ${file} não encontrado no diretório de origem.`);
          }
        }
      }
    });
  } catch (error) {
    console.error('Erro ao processar os arquivos:', error);
  }
};

// Chama a função para processar os arquivos
processFiles();