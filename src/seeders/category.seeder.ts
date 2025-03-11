import { Category } from "../models/category.model";
import { sequelize } from "../config/database";

const seedCategories = async () => {
  try {
    await sequelize.sync(); // Asegurar que la base de datos está sincronizada

    // Insertar categorías si no existen
    const categories = [
      { name: "Acción" },
      { name: "Comedia" },
      { name: "Drama" },
      { name: "Terror" },
      { name: "Ciencia Ficción" },
    ];

    await Category.bulkCreate(categories, { ignoreDuplicates: true });

    console.log("✅ Categorías insertadas correctamente");
    process.exit(); // Finalizar el proceso
  } catch (error) {
    console.error("❌ Error al insertar categorías:", error);
    process.exit(1);
  }
};

seedCategories();
