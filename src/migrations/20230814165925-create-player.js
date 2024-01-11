'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leagueId: {
        type: Sequelize.INTEGER
      },
      teamId: {
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull:true,
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        onDelete: 'CASCADE',
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      jerseyNumber: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      isWaitList: {
        type: Sequelize.INTEGER
      },
      isAcceptedList: {
        type: Sequelize.INTEGER
      },
      isDeleted: {
        type: Sequelize.INTEGER
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};