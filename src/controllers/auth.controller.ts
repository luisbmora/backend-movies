import { Request, Response } from "express";
import { User } from "../models/user.model";
import { generateToken } from "../config/jwt";
import bcrypt from "bcryptjs";
import Joi from "joi";

// 📌 Esquema de validación con Joi
const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// 📌 Registrar un nuevo usuario
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = authSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "❌ El usuario ya existe" });
      return;
    }

    const user = await User.create({ email, password });
    res.status(201).json({ message: "✅ Usuario registrado", user });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al registrar usuario" });
  }
};

// 📌 Iniciar sesión y generar token
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = authSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "❌ Credenciales incorrectas" });
      return;
    }

    const token = generateToken(user.id);
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al iniciar sesión" });
  }
};
