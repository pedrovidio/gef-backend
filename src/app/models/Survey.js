import Sequelize, { Model } from 'sequelize';

class Survey extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        link_input: Sequelize.STRING,
        link_webrep: Sequelize.STRING,
        status: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.FileSurvey, {
      foreignKey: 'idfile_surveys',
      as: 'image',
    });
    this.belongsTo(models.Qrcode, { foreignKey: 'idqrcodes', as: 'qrcode' });
  }
}

export default Survey;
