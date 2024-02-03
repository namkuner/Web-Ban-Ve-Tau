'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tripp extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example, you might want to associate Tripp with Train
      Tripp.belongsTo(models.Train, {
        foreignKey: 'MaTau',
        targetKey: 'MaTau',
        as: 'Train'
      });
    }
  };

  Tripp.init({
    MaTrip: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ThoiGianDi: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ThoiGianDen: {
      type: DataTypes.DATE,
      allowNull: false
    },
    DiaDiemDi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DiaDiemDen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Gia: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    MaTau: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Train', // Assuming 'Train' is the name of the Train model
        key: 'MaTau'
      }
    }
  }, {
    sequelize,
    modelName: 'Tripp',
  });

  return Tripp;
};