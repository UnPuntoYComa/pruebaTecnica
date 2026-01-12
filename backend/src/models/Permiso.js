import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Permiso = sequelize.define(
  "Permiso",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "permisos",
    timestamps: false,
  }
);

export default Permiso;
