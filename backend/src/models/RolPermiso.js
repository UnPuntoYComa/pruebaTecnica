import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const RolPermiso = sequelize.define(
  "RolPermiso",
  {
    rolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    permisoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permisos',
        key: 'id'
      }
    },
  },
  {
    tableName: "rol_permisos",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['rolId', 'permisoId']
      }
    ]
  }
);

export default RolPermiso;
