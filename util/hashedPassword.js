import bcrypt from 'bcrypt';

const saltRounds = 10; // Defina aqui os salt rounds

export const hashPassword = async (password) => {
    if (!password) throw new Error("Password é obrigatório");
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };