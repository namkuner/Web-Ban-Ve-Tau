'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Userr extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example, you might want to associate Userr with Tickett
      Userr.hasMany(models.Tickett, {
        foreignKey: 'UserID',
        sourceKey: 'ID',
        as: 'Tickett'
      });
    }
  };

  Userr.init({
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    CMND: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Ho: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Ten: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DiaChi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    NgaySinh: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    SDT: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Userr',
  });

  return Userr;
};