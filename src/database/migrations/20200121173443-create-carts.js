module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('carts', {
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
      limited_credit: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      limited_email: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      limited_sms: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      limited_whatsapp: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      price: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: false,
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
      idusers: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      idsurveys: {
        type: Sequelize.INTEGER,
        references: { model: 'surveys', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      idpackages: {
        type: Sequelize.INTEGER,
        references: { model: 'packages', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('carts');
  },
};
