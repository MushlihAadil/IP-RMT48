'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require("../data/quote.json").map((item) => {
      delete item.id;
      item.createdAt = item.updatedAt = new Date();
      return item;
    });

    await queryInterface.bulkInsert('Quotes', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Quotes', null, {});
  }
};
