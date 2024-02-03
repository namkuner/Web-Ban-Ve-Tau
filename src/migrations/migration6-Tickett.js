'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ticketts', {
      MaVe: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TrangThai: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ThoiGianDatVe: {
        type: Sequelize.DATE,
        allowNull: false
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Userrs', // Assuming 'Userrs' is the name of the Userr table
          key: 'ID'
        }
      },
      MaGhe: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ghes', // Assuming 'Ghes' is the name of the Ghe table
          key: 'MaGhe'
        }
      },
      MaTrip: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tripps', // Assuming 'Tripps' is the name of the Tripp table
          key: 'MaTrip'
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
    await queryInterface.dropTable('Ticketts');
  }
};