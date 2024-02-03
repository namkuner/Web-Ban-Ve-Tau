'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  User.init({
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password : DataTypes.STRING,
    email: DataTypes.STRING,
    CMND :  DataTypes.STRING,
    address : DataTypes.STRING,
    gender : DataTypes.STRING,
    roleID : DataTypes.STRING,
    chucVu : DataTypes.STRING,
    luong : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};