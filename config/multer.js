import multer from 'multer';
import path from 'path';
 

const storage = multer.diskStorage({
  destination: (req,file, cb ) =>{
    cb(null, 'uploads/')
    
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}_${String(now.getMinutes()).padStart(2, "0")}_${String(now.getSeconds()).padStart(2, "0")}`;

    // Gera um número aleatório para garantir que o nome seja único
    const randomNumber = Math.floor(Math.random() * 1000000);

    // Adiciona a extensão do arquivo
    cb(null, `${timestamp}_${randomNumber}${path.extname(file.originalname)}`); 
  },
});


  const upload = multer({storage})
 
 export default upload;