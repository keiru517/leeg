'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leagues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      sport: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255)
      },
      description: {
        type: Sequelize.STRING(500)
      },
      logo: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.STRING
      },
      minute: {
        type: Sequelize.INTEGER
      },
      second: {
        type: Sequelize.INTEGER
      },
      isAllowedFan: {
        type: Sequelize.BOOLEAN
      },
      displaySubstitutes: {
        type: Sequelize.BOOLEAN
      },
      displayPosition: {
        type: Sequelize.BOOLEAN
      },
      displayJerseyNumber: {
        type: Sequelize.BOOLEAN
      },
      displayAttempts3: {
        type: Sequelize.BOOLEAN
      },
      displayAttempts2: {
        type: Sequelize.BOOLEAN
      },
      displayAttempts1: {
        type: Sequelize.BOOLEAN
      },
      displayRebounds: {
        type: Sequelize.BOOLEAN
      },
      displayBlocks: {
        type: Sequelize.BOOLEAN
      },
      displayAssists: {
        type: Sequelize.BOOLEAN
      },
      displayFouls: {
        type: Sequelize.BOOLEAN
      },
      displaySteals: {
        type: Sequelize.BOOLEAN
      },
      displayTurnovers: {
        type: Sequelize.BOOLEAN
      },
      requirePassword: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING
      },
      isDeleted: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Leagues');
  }
};
