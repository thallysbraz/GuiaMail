"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "plan_id", {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: "Plans",
        key: "id"
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    });
  },

  down: queryInterface => {}
};
