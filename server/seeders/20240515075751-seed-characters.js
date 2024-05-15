'use strict';

const { default: axios } = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let fetchData = await axios.get('https://potterapi-fedeperin.vercel.app/en/characters')
    let data = fetchData.data.map((item) => {
      let children = item.children.join(', ');
      if (children === '') {
        children = 'This character does not have children.'
      }

      return {
        fullName: item.fullName,
        nickname: item.nickname,
        hogwartsHouse: item.hogwartsHouse,
        actor: item.interpretedBy,
        children: children,
        imageUrl: item.image,
        birthdate: item.birthdate,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    await queryInterface.bulkInsert('Characters', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Characters', null, {});
  }
};
