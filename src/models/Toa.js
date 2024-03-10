'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Toa extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example, you might want to associate MaTau as a foreign key
      Toa.belongsTo(models.Train, {
        foreignKey: 'MaTau',
        targetKey: 'MaTau',
        as: 'Train'
      });
      Toa.hasMany(models.Ghe, { foreignKey: 'MaToa', as: 'Ghe' });
    }
  };

  Toa.init({
    MaToa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    TenToa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MaTau: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Train', // Assuming 'Train' is the name of the Train model
        key: 'MaTau'
      }
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Toa',
  });

  return Toa;
};