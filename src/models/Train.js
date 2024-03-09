'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Train extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example, you might want to associate Train with Toa
      Train.hasMany(models.Toa, {
        foreignKey: 'MaTau',
        sourceKey: 'MaTau',
        as: 'Toa'
      });
    }
  };

  Train.init({
    MaTau: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    TenTau: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Train',
  });

  return Train;
};