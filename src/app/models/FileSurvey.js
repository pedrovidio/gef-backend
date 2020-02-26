import Sequelize, { Model } from 'sequelize';

class FileSurvey extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/filesurvey/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Survey, { foreignKey: 'idsurveys' });
  }
}

export default FileSurvey;
