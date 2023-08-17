'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leagueId: {
        allowNull: false,
        references: {
          model: 'Leagues',
          key: 'id'
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.INTEGER
      },
      max: {
        type: Sequelize.INTEGER
      },
      min: {
        type: Sequelize.INTEGER
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Teams');
  }
};