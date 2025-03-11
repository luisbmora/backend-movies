import { Router } from "express";
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Películas
 *   description: Endpoints para gestionar películas
 */

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Crear una nueva película
 *     tags: [Películas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Avengers: Endgame"
 *               description:
 *                 type: string
 *                 example: "La batalla final de los Vengadores contra Thanos."
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Película creada correctamente
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: No autorizado, se requiere un token JWT
 */
router.post("/", authMiddleware, createMovie);

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Obtener todas las películas
 *     tags: [Películas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de películas por página
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filtrar por título de la película
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filtrar por ID de categoría
 *     responses:
 *       200:
 *         description: Lista de películas obtenida correctamente
 */
router.get("/", getMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Obtener una película por su ID
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película a obtener
 *     responses:
 *       200:
 *         description: Película obtenida correctamente
 *       404:
 *         description: Película no encontrada
 */
router.get("/:id", getMovieById);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Actualizar una película por su ID
 *     tags: [Películas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Avengers: Infinity War"
 *               description:
 *                 type: string
 *                 example: "La antesala de la batalla final."
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Película actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado, se requiere un token JWT
 *       404:
 *         description: Película no encontrada
 */
router.put("/:id", authMiddleware, updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Eliminar una película por su ID
 *     tags: [Películas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película a eliminar
 *     responses:
 *       200:
 *         description: Película eliminada exitosamente
 *       401:
 *         description: No autorizado, se requiere un token JWT
 *       404:
 *         description: Película no encontrada
 */
router.delete("/:id", authMiddleware, deleteMovie);

export default router;