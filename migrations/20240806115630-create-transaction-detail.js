"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TransactionDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TransactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Transactions",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      LaptopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Laptops",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TransactionDetails");
  },
};
