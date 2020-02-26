import Sequelize, { Model } from 'sequelize';

class Package extends Model {
  static init(sequelize) {
    super.init(
      {
        credit: Sequelize.NUMBER,
        email: Sequelize.NUMBER,
        sms: Sequelize.NUMBER,
        whatsapp: Sequelize.NUMBER,
        price_credit: Sequelize.NUMBER,
        price_email: Sequelize.NUMBER,
        price_sms: Sequelize.NUMBER,
        price_whatsapp: Sequelize.NUMBER,
        price: Sequelize.NUMBER,
        sale: Sequelize.NUMBER,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Survey, { foreignKey: 'idsurveys', as: 'products' });
  }
}

export default Package;
