module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('prices', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      credit: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: true,
      },
      email: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: true,
      },
      sms: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: true,
      },
      whatsapp: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('prices');
  },
};
