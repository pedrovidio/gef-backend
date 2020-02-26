module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('surveys_acc', 'idcabec', {
      type: Sequelize.INTEGER,
      references: { model: 'cabecs', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColmn('surveys_acc', 'idcabec');
  },
};
