'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tickett extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example, you might want to associate Tickett with User, Ghe, and Tripp
      Tickett.belongsTo(models.User, {
        foreignKey: 'UserID',
        targetKey: 'ID',
        as: 'User'
      });
      Tickett.belongsTo(models.Ghe, {
        foreignKey: 'MaGhe',
        targetKey: 'MaGhe',
        as: 'Ghe'
      });
      Tickett.belongsTo(models.Tripp, {
        foreignKey: 'MaTrip',
        targetKey: 'MaTrip',
        as: 'Tripp'
      });
    }
  };

  Tickett.init({
    MaVe: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    TrangThai: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ThoiGianDatVe: {
      type: DataTypes.DATE,
      allowNull: false
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Assuming 'User' is the name of the User model
        key: 'ID'
      }
    },
    MaGhe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ghe', // Assuming 'Ghe' is the name of the Ghe model
        key: 'MaGhe'
      }
    },
    MaTrip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tripp', // Assuming 'Tripp' is the name of the Tripp model
        key: 'MaTrip'
      }
    }
  }, {
    sequelize,
    modelName: 'Tickett',
  });

  return Tickett;
};