'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Userrs', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CMND: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Ho: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Ten: {
        type: Sequelize.STRING,
        allowNull: false
      },
      DiaChi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      NgaySinh: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      SDT: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Role: {
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
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Userrs');
  }
};
