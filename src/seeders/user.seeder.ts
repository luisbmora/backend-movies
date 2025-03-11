import { User } from "../models/user.model";
import { sequelize } from "../config/database";

const seedUsers = async () => {
  try {
    await sequelize.sync(); // Asegurar que la base de datos está sincronizada

    const users = [
      { email: "admin@example.com", password: "admin123" },
      { email: "user1@example.com", password: "password123" },
      { email: "user2@example.com", password: "password123" },
    ];

    for (const userData of users) {
      const user = await User.findOne({ where: { email: userData.email } });
      if (!user) {
        await User.create(userData);
      }
    }

    console.log("✅ Usuarios insertados correctamente");
    process.exit();
  } catch (error) {
    console.error("❌ Error al insertar usuarios:", error);
    process.exit(1);
  }
};

seedUsers();
