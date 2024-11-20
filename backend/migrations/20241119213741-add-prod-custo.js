'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Produtos', 'Prod_custo', {
      type: Sequelize.FLOAT,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Produtos', 'Prod_custo');
  },
};
