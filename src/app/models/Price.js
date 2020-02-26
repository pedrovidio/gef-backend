import Sequelize, { Model } from 'sequelize';

class Price extends Model {
  static init(sequelize) {
    super.init(
      {
        credit: Sequelize.NUMBER,
        email: Sequelize.NUMBER,
        sms: Sequelize.NUMBER,
        whatsapp: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Price;
