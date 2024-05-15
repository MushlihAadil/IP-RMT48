'use strict';
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let fetchData = await axios.get('https://potterapi-fedeperin.vercel.app/en/books')
    let data = fetchData.data.map((item) => {
      return {
        id: item.number,
        title: item.title,
        author: "J. K. Rowling",
        releaseDate: item.releaseDate,
        imageUrl: item.cover,
        description: item.description,
        price: item.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    // await queryInterface.bulkInsert('Books', data, {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Books', null, {});
  }
};
