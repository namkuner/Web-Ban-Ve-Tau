'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        // firstName: DataTypes.STRING,
        // lastName: DataTypes.STRING,
        // phoneNumber: DataTypes.STRING,
        // password : DataTypes.STRING,
        // email: DataTypes.STRING,
        // CMND :  DataTypes.STRING,
        // address : DataTypes.STRING,
        // gender : DataTypes.INTEGER,
        // roleID : DataTypes.STRING,
    
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      CMND: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },

      gender: {
        type: Sequelize.STRING
      },
      roleID: {
        type: Sequelize.STRING
      },
      chucVu: {
        type: Sequelize.STRING
      },
      luong: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};