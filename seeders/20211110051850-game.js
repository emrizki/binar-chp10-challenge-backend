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

    await queryInterface.bulkInsert('games', [
      {
      name: 'batu-kertas-guntin',
      description: 'permainan batu kertas gunting ',
      play_count: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'monopoli',
      description: 'permainan monopoli',
      play_count: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'congklak',
      description: 'permainan congklak',
      play_count: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'tebak angka',
      description: 'permainan tebak angka',
      play_count: 30,
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
    await queryInterface.bulkDelete('games', null, {});
  }
};
