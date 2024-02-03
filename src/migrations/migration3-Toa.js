'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Toas', {
      MaToa: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TenToa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MaTau: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Trains', // Assuming 'Train' is the name of the Train table
          key: 'MaTau'
        }
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
    await queryInterface.dropTable('Toas');
  }
};