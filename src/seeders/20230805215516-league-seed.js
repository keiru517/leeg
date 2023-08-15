"use strict";

const { DATE_TILE_FORMAT } = require("../helpers");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "leagues",
      [
        {
          name: "max",
          description: "antoniuk",
          logo: "logo",
          startDate: moment().format(DATE_TILE_FORMAT),
          endDate: moment().format(DATE_TILE_FORMAT),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
