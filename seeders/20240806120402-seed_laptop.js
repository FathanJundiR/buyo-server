"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const laptops = require("../data/laptops.json");
    laptops.forEach((laptop) => {
      laptop.createdAt = laptop.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Laptops", laptops, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Laptops", null, {});
  },
};
