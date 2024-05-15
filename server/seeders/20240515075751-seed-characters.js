'use strict';

const { default: axios } = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let fetchData = await axios.get('https://potterapi-fedeperin.vercel.app/en/characters')
    let data = fetchData.data.map((item) => {
      if (item.children == []) {
        item.children = 'Have no children';
      } 

      return {
        fullName: item.fullName,
        nickname: item.nickname,
        hogwartsHouse: item.hogwartsHouse,
        actor: item.interpretedBy,
        children: item.children,
        imageUrl: item.image,
        birthdate: item.birthdate
      }
    });

    await queryInterface.bulkInsert('Characters', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Characters', null, {});
  }
};
