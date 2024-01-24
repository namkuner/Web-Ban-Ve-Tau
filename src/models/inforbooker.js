'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inforbooker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inforbooker.hasMany(models.Ticket, { foreignKey: 'userdatve', as: 'tickets' });
    }
  };
  Inforbooker.init({
    Hoten: DataTypes.STRING,
    //Phone: DataTypes.INTEGER,
    Phone: DataTypes.STRING,
    Email: DataTypes.STRING,
    //CCCD: DataTypes.INTEGER,
    //CCCD: DataTypes.BIGINT,
    CCCD: DataTypes.STRING,
    Ngaydi: DataTypes.DATE,
    Sove: DataTypes.INTEGER,
    Tongtien: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Inforbooker',
  });
  return Inforbooker;
};