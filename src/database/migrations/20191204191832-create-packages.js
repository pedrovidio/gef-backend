module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('packages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      credit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      email: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      sms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      whatsapp: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      price_credit: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: true,
      },
      price_email: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: true,
      },
      price_sms: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: true,
      },
      price_whatsapp: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: true,
      },
      price: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: false,
      },
      sale: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      idsurveys: {
        type: Sequelize.INTEGER,
        references: { model: 'surveys', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('packages');
  },
};
