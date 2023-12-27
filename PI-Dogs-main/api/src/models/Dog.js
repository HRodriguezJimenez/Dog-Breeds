const { DataTypes } = require('sequelize')
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
      allowNull: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    minHeight: {
      type: DataTypes.INTEGER,
      validate: { // Estas validaciones aseguran que los valores esten entre los rangos especificos y generan mensajes personalizados si no se cumple la condición.
        min: { args: 1, msg: "The minimum height must be greater than or equal to 1" },
        max: { args: 100, msg: "The minimum height must be less than or equal to 100" },
      },
      allowNull: false,
    },
    maxHeight: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "The maximum height must be greater than or equal to 1" },
        max: { args: 100, msg: "The maximum height must be less than or equal to 100" },
      },
      allowNull: false,
    },
    minWeight: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "The minimum weight must be greater than or equal to 1" },
        max: { args: 100, msg: "The minimum weight must be less than or equal to 100" },
      },
      allowNull: false,
    },
    maxWeight: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "The maximum weight must be greater than or equal to 1" },
        max: { args: 100, msg: "The maximum weight must be less than or equal to 100" },
      },
      allowNull: false,
    },
    minLifeSpan: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "The minimum life span must be greater than or equal to 1" },
        max: { args: 20, msg: "The minimum life span must be less than or equal to 20" },
      },
      allowNull: false,
    },
    maxLifeSpan: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1, msg: "The maximum lifetime must be greater than or equal to 1" },
        max: { args: 20, msg: "The maximum life span must be less than or equal to 20" },
      },
      allowNull: false,
    },
    temperaments: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created : {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },{timestamps: false},
  );
};
