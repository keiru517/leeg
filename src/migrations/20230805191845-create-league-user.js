'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LeagueUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leagueId: {
        allowNull: false,
        references: {
          model:'Leagues',
          key: 'id'
        },
        onDelete:'CASCADE',
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        references: {
          model:'Users',
          key: 'id'
        },
        onDelete:'CASCADE',
        type: Sequelize.INTEGER
      },
      isWaitList: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      },
      isAcceptedList: {
        allowNull:false,
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
  },
  async down(queryInterface) {
    await queryInterface.dropTable('LeagueUsers');
  }
};
