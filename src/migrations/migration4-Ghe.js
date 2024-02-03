'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ghes', {
      MaGhe: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TenGhe: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MaToa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Toas', // Assuming 'Toa' is the name of the Toa table
          key: 'MaToa'
        }
      }
      ,            createdAt: {
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
    await queryInterface.dropTable('Ghes');
  }
};