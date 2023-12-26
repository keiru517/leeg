'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Substitutes', {
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
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      jerseyNumber: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.STRING
      },
      totalPoints: {
        type: Sequelize.INTEGER
      },
      totalPoints3: {
        type: Sequelize.INTEGER
      },
      totalPoints2: {
        type: Sequelize.INTEGER
      },
      totalPoints1: {
        type: Sequelize.INTEGER
      },
      attempts3: {
        type: Sequelize.INTEGER
      },
      attempts2: {
        type: Sequelize.INTEGER
      },
      attempts1: {
        type: Sequelize.INTEGER
      },
      blocks: {
        type: Sequelize.INTEGER
      },
      rebounds: {
        type: Sequelize.INTEGER
      },
      assists: {
        type: Sequelize.INTEGER
      },
      fouls: {
        type: Sequelize.INTEGER
      },
      steals: {
        type: Sequelize.INTEGER
      },
      turnovers: {
        type: Sequelize.INTEGER
      },
      attendance: {
        type: Sequelize.BOOLEAN
      },
      isSubstitute: {
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
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Substitutes');
    /**
     * await queryInterface.dropTable('Teams');
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
