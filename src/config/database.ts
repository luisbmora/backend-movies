import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "mora123",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a PostgreSQL");

    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ force: true });
    console.log("✅ Base de datos sincronizada");
  } catch (error) {
    console.error("❌ Error al conectar la base de datos:", error);
    //process.exit(1);
  }
};
