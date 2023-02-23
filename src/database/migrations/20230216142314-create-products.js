"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        field: "created_at",
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable("products")
  },
}
