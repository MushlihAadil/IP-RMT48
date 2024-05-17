'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING
      },
      hogwartsHouse: {
        type: Sequelize.STRING
      },
      actor: {
        type: Sequelize.STRING
      },
      children: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Characters');
  }
};