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
    weight_min: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 100 },
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 100 },
      allowNull: false,
    },
    height_min: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 100 },
      allowNull: false,
    },
    height_max: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 100 },
      allowNull: false,
    },
    life_span_min : {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 20 },
      allowNull: false,
    },
    life_span_max : {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 20 },
      allowNull: false,
    }, 
    created : {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },{timestamps: false},
  );
};
