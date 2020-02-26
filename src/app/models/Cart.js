import Sequelize, { Model } from 'sequelize';

class Cart extends Model {
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
        limited_credit: Sequelize.BOOLEAN,
        limited_email: Sequelize.BOOLEAN,
        limited_sms: Sequelize.BOOLEAN,
        limited_whatsapp: Sequelize.BOOLEAN,
        price: Sequelize.NUMBER,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'idusers', as: 'user' });
    this.belongsTo(models.Survey, { foreignKey: 'idsurveys', as: 'survey' });
    this.belongsTo(models.Package, { foreignKey: 'idpackages', as: 'package' });
  }
}

export default Cart;
