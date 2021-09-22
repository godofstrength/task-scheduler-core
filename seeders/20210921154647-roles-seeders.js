'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('roles', [{
      id: 1,
      name: 'Administrator',
      permission: '',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      id: 2,
      name: 'Moderator',
      permission: '',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      id: 3,
      name: 'Member',
      permission: '',
      createdAt : new Date(),
      updatedAt : new Date()
    }])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
