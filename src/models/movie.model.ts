import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Category } from "./category.model";

export class Movie extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public categoryId!: number;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "movie", timestamps: true }
);

// 📌 RELACIÓN: Una película pertenece a una categoría
Movie.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

// 📌 RELACIÓN: Una categoría tiene muchas películas
Category.hasMany(Movie, { foreignKey: "categoryId", as: "movies" });
