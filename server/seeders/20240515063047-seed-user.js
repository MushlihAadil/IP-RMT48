'use strict';
const { hashPassword } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/user.json").map((item) => {
      delete item.id;
      item.createdAt = item.updatedAt = new Date();
      item.password = hashPassword(item.password);
      return item;
    });

    await queryInterface.bulkInsert('Users', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
