'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: "Nam",
      lastName: "Pham",
      email: "namkuner@gmail.com",
      CMND :  "251330516",
      phoneNumber: "0784852324",
      password : "namkuner2402",
      address : "Thon 4 , xa Tam Bo",
      gender : 0,

      roleID : "R1",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
