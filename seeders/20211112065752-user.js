'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        first_name: 'dadang',
        last_name: 'kurniawan',
        email: 'dadang@gmail.com',
        username: 'dadang',
        password: '123',
        total_score:'2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'dadang1',
        last_name: 'kurniawan2',
        email: 'dadang1@gmail.com',
        username: 'dadang1',
        password: '123',
        total_score:'3',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
