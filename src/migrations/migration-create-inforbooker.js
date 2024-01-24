'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Inforbookers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Hoten: {
        type: Sequelize.STRING
      },
      //Phone: {
      //  type: Sequelize.INTEGER
      //},
      Phone: {
        type: Sequelize.STRING,
      },
      Email: {
        type: Sequelize.STRING
      },
      //CCCD: {
      //  type: Sequelize.BIGINT
      //},
      CCCD: {
        type: Sequelize.STRING,
      },
      Ngaydi: {
        type: Sequelize.DATE
      },
      Sove: {
        type: Sequelize.INTEGER
      },
      Tongtien: {
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
    await queryInterface.dropTable('Inforbookers');
  }
};