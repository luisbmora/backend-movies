import { Request, Response } from "express";
import { User } from "../models/user.model";
import Joi from "joi";

// 📌 Esquema de validación con Joi
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// 📌 Crear un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validar los datos de entrada con Joi
    const { error } = userSchema.validate({email: req.body.email, password: req.body.password});
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      res.status(400).json({ error: "❌ El correo electrónico ya está registrado" });
      return;
    }

    // Crear el nuevo usuario
    const newUser = await User.create(req.body);

    // Excluir la contraseña en la respuesta
    const userResponse = { ...newUser.toJSON() };
    delete userResponse.password;

    res.status(201).json({ message: "✅ Usuario creado exitosamente", user: userResponse });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al crear el usuario" });
  }
};

// 📌 Obtener todos los usuarios (solo para administradores)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "❌ Error al obtener los usuarios" });
  }
};

// 📌 Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });

    if (!user) {
      res.status(404).json({ error: "❌ Usuario no encontrado" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "❌ Error al obtener el usuario" });
  }
};

// 📌 Actualizar un usuario
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error } = userSchema.validate({email: req.body.email, password: req.body.password});
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "❌ Usuario no encontrado" });
      return;
    }

    await user.update(req.body);
    res.json({ message: "✅ Usuario actualizado", user });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al actualizar el usuario" });
  }
};

// 📌 Eliminar un usuario
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: "❌ Usuario no encontrado" });
      return;
    }

    await user.destroy();
    res.json({ message: "🗑 Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al eliminar el usuario" });
  }
};
