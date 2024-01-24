'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Train', {
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
      TrangThai: {
        type: Sequelize.BOOLEAN,
        defaultValue: true // You can set a default value if needed
      },

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Train');
  }
};