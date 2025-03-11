import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import bcrypt from "bcryptjs";

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;

  // Método para verificar la contraseña
  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user", timestamps: true }
);

// Hashear la contraseña antes de guardar el usuario
User.beforeCreate(async (user: User) => {
  user.password = await bcrypt.hash(user.password, 10);
});
