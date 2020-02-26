module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'idfiles', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColmn('users', 'idfiles');
  },
};
