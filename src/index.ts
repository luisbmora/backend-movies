import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import movieRoutes from "./routes/movie.routes";
import categoryRoutes from "./routes/category.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { setupSwagger } from "./config/swagger";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5432;

app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Configurar Swagger
setupSwagger(app);


// Registrar rutas
app.use("/api/movies", movieRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
