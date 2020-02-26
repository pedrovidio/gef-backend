module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('surveys_acc', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      q1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      q2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      q3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      q4: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      q5: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      start_dt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_dt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      idusers: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      idsurveys: {
        type: Sequelize.INTEGER,
        references: { model: 'surveys', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      idpackages: {
        type: Sequelize.INTEGER,
        references: { model: 'packages', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('surveys_acc');
  },
};
