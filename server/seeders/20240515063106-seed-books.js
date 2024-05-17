'use strict';
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let fetchData = await axios.get('https://potterapi-fedeperin.vercel.app/en/books')
    let data = fetchData.data.map((item) => {

      let actualPrice;
      if (item.title == `Harry Potter and the Sorcerer's Stone`) {
        actualPrice = 227000
      } else if (item.title == `Harry Potter and the chamber of secrets`) {
        actualPrice = 227000
      } else if (item.title == `Harry Potter and the Prisoner of Azkaban`) {
        actualPrice = 136000
      } else if (item.title == `Harry Potter and the Goblet of Fire`) {
        actualPrice = 205000
      } else if (item.title == `Harry Potter and the Order of the Phoenix`) {
        actualPrice = 260000
      } else if (item.title == `Harry Potter and the Half-Blood Prince`) {
        actualPrice = 245000
      } else if (item.title == `Harry Potter and the Deathly Hallows`) {
        actualPrice = 296000
      } else if (item.title == `Harry Potter and the Cursed Child`) {
        actualPrice = 168000
      }

      return {
        id: item.number,
        title: item.title,
        author: "J. K. Rowling",
        releaseDate: item.releaseDate,
        imageUrl: item.cover,
        description: item.description,
        price: actualPrice,
        pages: item.pages,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    await queryInterface.bulkInsert('Books', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
