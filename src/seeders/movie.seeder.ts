import { Movie } from "../models/movie.model";
import { Category } from "../models/category.model";
import { sequelize } from "../config/database";

const seedMovies = async () => {
  try {
    await sequelize.sync(); // Asegurar que la base de datos está sincronizada

    // Obtener categorías para asignarlas a las películas
    const categories = await Category.findAll();
    if (categories.length === 0) {
      console.log("⚠️ No hay categorías en la base de datos. Ejecuta primero el seeder de categorías.");
      process.exit(1);
    }

    const movies = [
      { title: "Avengers: Endgame", description: "La batalla final de los Vengadores contra Thanos.", categoryId: categories[0].id },
      { title: "Joker", description: "Historia de origen del villano más icónico de Batman.", categoryId: categories[2].id },
      { title: "Toy Story 4", description: "Las aventuras de Woody y Buzz en una nueva entrega.", categoryId: categories[1].id },
      { title: "IT", description: "Un grupo de niños enfrenta a un payaso terrorífico.", categoryId: categories[3].id },
      { title: "Interstellar", description: "Una odisea espacial para salvar la humanidad.", categoryId: categories[4].id },
    ];

    await Movie.bulkCreate(movies, { ignoreDuplicates: true });

    console.log("✅ Películas insertadas correctamente");
    process.exit();
  } catch (error) {
    console.error("❌ Error al insertar películas:", error);
    process.exit(1);
  }
};

seedMovies();
