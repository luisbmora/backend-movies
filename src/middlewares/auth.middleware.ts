import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
    return;
  }

  const tokenWithoutBearer = token.replace("Bearer ", "");
  const decoded = verifyToken(tokenWithoutBearer);

  if (!decoded) {
    res.status(401).json({ error: "Token inválido o expirado." });
    return;
  }

  req.body.userId = (decoded as { id: number }).id; // Asegurar tipo del `id`
  next();
};
