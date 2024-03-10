'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trips', {
      MaTrip: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ThoiGianDi: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ThoiGianDen: {
        type: Sequelize.DATE,
        allowNull: false
      },
      DiaDiemDi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      DiaDiemDen: {
        type: Sequelize.STRING,
        allowNull: false
      },

      MaTau: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Trains', // Assuming 'Trains' is the name of the Train table
          key: 'Matau'
        }
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
    await queryInterface.dropTable('Trips');
  }
};
