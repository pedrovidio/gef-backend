module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('surveys', 'idqrcodes', {
      type: Sequelize.INTEGER,
      references: { model: 'qrcodes', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColmn('surveys', 'idqrcodes');
  },
};
