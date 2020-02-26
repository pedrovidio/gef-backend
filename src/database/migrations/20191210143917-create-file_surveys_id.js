module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('surveys', 'idfile_surveys', {
      type: Sequelize.INTEGER,
      references: { model: 'file_surveys', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColmn('surveys', 'idfile_surveys');
  },
};
