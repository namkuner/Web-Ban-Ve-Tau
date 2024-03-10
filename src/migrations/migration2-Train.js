'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trains', {
    MaTau: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TenTau: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    flag : {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Trains');
  }
};