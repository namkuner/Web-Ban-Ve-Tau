'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ghe extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example, you might want to associate Ghe with Toa
      Ghe.belongsTo(models.Toa, {
        foreignKey: 'MaToa',
        targetKey: 'MaToa',
        as: 'Toa'
      });
    }
  };

  Ghe.init({
    MaGhe: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    TenGhe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MaToa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Toa', // Assuming 'Toa' is the name of the Toa model
        key: 'MaToa'
      }
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Ghe',
  });

  return Ghe;
};