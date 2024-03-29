'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tickets', {
      MaVe: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TrangThai: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ThoiGianDatVe: {
        type: Sequelize.DATE,
        allowNull: true
      },
      Gia: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', // Assuming 'Userrs' is the name of the Userr table
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
          model: 'Trips', // Assuming 'Tripps' is the name of the Tripp table
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
    },
    flag : {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true }
       
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tickets');
  }
};