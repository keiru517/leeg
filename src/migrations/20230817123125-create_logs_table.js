'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Logs',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerId: {
        allowNull: true,
        references: {
          model: 'Players',
          key: 'id'
        },
        onDelete: 'CASCADE',
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
      matchId: {
        allowNull: false,
        references: {
          model: 'Matches',
          key: 'id'
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      teamId: {
        allowNull: false,
        references: {
          model: 'Teams',
          key: 'id'
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      event: {
        type: Sequelize.STRING
      },
      period: {
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.STRING
      },
      isDirect: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Logs');
    /**
     * await queryInterface.dropTable('Teams');
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
