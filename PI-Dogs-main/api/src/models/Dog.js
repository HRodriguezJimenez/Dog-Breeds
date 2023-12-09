const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    minHeight: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "La altura mínima debe ser mayor o igual a 1" },
        max: { args: 100, msg: "La altura mínima debe ser menor o igual a 100" },
      },
      allowNull: false,
    },
    maxHeight: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "La altura máxima debe ser mayor o igual a 1" },
        max: { args: 100, msg: "La altura máxima debe ser menor o igual a 100" },
      },
      allowNull: false,
    },
    minWeight: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "El peso mínimo debe ser mayor o igual a 1" },
        max: { args: 100, msg: "El peso mínimo debe ser menor o igual a 100" },
      },
      allowNull: false,
    },
    maxWeight: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "El peso máximo debe ser mayor o igual a 1" },
        max: { args: 100, msg: "El peso máximo debe ser menor o igual a 100" },
      },
      allowNull: false,
    },
    minLifeSpan: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "La duración mínima de la vida debe ser mayor o igual a 1" },
        max: { args: 20, msg: "La duración mínima de la vida debe ser menor o igual a 20" },
      },
      allowNull: false,
    },
    maxLifeSpan: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "La duración máxima de la vida debe ser mayor o igual a 1" },
        max: { args: 20, msg: "La duración máxima de la vida debe ser menor o igual a 20" },
      },
      allowNull: false,
    },
    created : {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },{timestamps: false},
  );
};
