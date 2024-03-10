'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example, you might want to associate Userr with Tickett
      User.hasMany(models.Ticket, {
        foreignKey: 'UserID',
        sourceKey: 'ID',
        as: 'Ticket'
      });
    }
  };

  User.init({
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
    PassWord: {
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
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    } 
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};