import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secreto_super_seguro";

// Generar un token JWT
export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1d" });
};

// Verificar token JWT
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
