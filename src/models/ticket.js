'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example, you might want to associate Tickett with User, Ghe, and Tripp
      Ticket.belongsTo(models.User, {
        foreignKey: 'UserID',
        targetKey: 'ID',
        as: 'User'
      });
      Ticket.belongsTo(models.Ghe, {
        foreignKey: 'MaGhe',
        targetKey: 'MaGhe',
        as: 'Ghe'
      });
      Ticket.belongsTo(models.Trip, {
        foreignKey: 'MaTrip',
        targetKey: 'MaTrip',
        as: 'Trip'
      });
    }
  };

  Ticket.init({
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
      allowNull: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User', // Assuming 'User' is the name of the User model
        key: 'ID'
      }
    },
    MaGhe: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Ghe', // Assuming 'Ghe' is the name of the Ghe model
        key: 'MaGhe'
      }
    },
    MaTrip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Trip', // Assuming 'Tripp' is the name of the Tripp model
        key: 'MaTrip'
      }
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });

  return Ticket;
};