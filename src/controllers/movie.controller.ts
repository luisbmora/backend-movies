import { Request, Response } from "express";
import { Movie } from "../models/movie.model";
import { Category } from "../models/category.model";
import Joi from "joi";

// 📌 Esquema de validación con Joi
const movieSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  categoryId: Joi.number().integer().required(),
});

// 📌 Crear una nueva película
export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = movieSchema.validate({title: req.body.title, description: req.body.description, categoryId: req.body.categoryId});
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const movie = await Movie.create(req.body);
    res.status(201).json({ message: "🎬 Película creada exitosamente", movie });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al crear la película" });
  }
};

// 📌 Obtener todas las películas con paginación y filtrado
export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    // Usar el alias "category" en el include
    const movies = await Movie.findAll({
      include: [{ model: Category, as: "category" }], // Especificar el alias aquí
    });

    res.json(movies);
  } catch (error) {
    console.error(error); // Para depurar el error en la consola
    res.status(500).json({ error: "❌ Error al obtener las películas" });
  }
};

// 📌 Obtener una película por ID
export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Usar el alias "category" en el include
    const movie = await Movie.findByPk(id, {
      include: [{ model: Category, as: "category" }], // Especificar el alias aquí
    });

    if (!movie) {
      res.status(404).json({ error: "❌ Película no encontrada" });
      return;
    }

    res.json(movie);
  } catch (error) {
    console.error(error); // Para depurar el error en la consola
    res.status(500).json({ error: "❌ Error al obtener la película" });
  }
};

// 📌 Actualizar una película
export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error } = movieSchema.validate({title: req.body.title, description: req.body.description, categoryId: req.body.categoryId});
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const movie = await Movie.findByPk(id);
    if (!movie) {
      res.status(404).json({ error: "❌ Película no encontrada" });
      return;
    }

    await movie.update(req.body);
    res.json({ message: "✅ Película actualizada", movie });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al actualizar la película" });
  }
};

// 📌 Eliminar una película
export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
      res.status(404).json({ error: "❌ Película no encontrada" });
      return;
    }

    await movie.destroy();
    res.json({ message: "🗑 Película eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al eliminar la película" });
  }
};
