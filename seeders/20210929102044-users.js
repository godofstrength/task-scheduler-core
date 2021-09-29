'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      id: 1,
      firstname: 'admin',
      lastname: 'test',
      email: 'admin@gmail.com',
      password: '$2a$10$qM4G1qSrflJNhM4PJ8mRA.YDg8kVpOP346SwFzibSxxHO7SuKOlwu', //123456
      createdAt : new Date(),
      updatedAt : new Date()
    }]
    await queryInterface.bulkInsert('users', fields,{})
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

    await queryInterface.bulkDelete('users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
