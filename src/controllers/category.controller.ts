import { Request, Response } from "express";
import { Category } from "../models/category.model";
import { Movie } from "../models/movie.model";
import Joi from "joi";

// 📌 Esquema de validación con Joi
const categorySchema = Joi.object({
  name: Joi.string().required(),
});

// 📌 Crear una nueva categoría
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = categorySchema.validate({name: req.body.name});
    console.log(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { name } = req.body;
    const category = await Category.create({ name });

    res.status(201).json({ message: "✅ Categoría creada", category });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al crear la categoría" });
  }
};

// 📌 Obtener todas las categorías (paginadas o todas)
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit } = req.query;
    let categories;

    if (page && limit) {
      const offset = (Number(page) - 1) * Number(limit);
      categories = await Category.findAndCountAll({ limit: Number(limit), offset });
      res.json({ total: categories.count, categories: categories.rows });
    } else {
      categories = await Category.findAll();
      res.json(categories);
    }
  } catch (error) {
    res.status(500).json({ error: "❌ Error al obtener las categorías" });
  }
};

// 📌 Obtener una categoría por ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      res.status(404).json({ error: "❌ Categoría no encontrada" });
      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "❌ Error al obtener la categoría" });
  }
};

// 📌 Actualizar una categoría
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error } = categorySchema.validate({name: req.body.name});
    console.log(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const category = await Category.findByPk(id);
    if (!category) {
      res.status(404).json({ error: "❌ Categoría no encontrada" });
      return;
    }

    await category.update(req.body);
    res.json({ message: "✅ Categoría actualizada", category });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al actualizar la categoría" });
  }
};

// 📌 Eliminar una categoría (solo si no tiene películas asociadas)
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Verificar si hay películas en esta categoría
    const moviesCount = await Movie.count({ where: { categoryId: id } });
    if (moviesCount > 0) {
      res.status(400).json({ error: "❌ No se puede eliminar. Hay películas en esta categoría." });
      return;
    }

    const category = await Category.findByPk(id);
    if (!category) {
      res.status(404).json({ error: "❌ Categoría no encontrada" });
      return;
    }

    await category.destroy();
    res.json({ message: "🗑 Categoría eliminada" });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al eliminar la categoría" });
  }
};
