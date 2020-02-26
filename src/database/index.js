import Sequelize from 'sequelize';

import Cart from '../app/models/Cart';
import File from '../app/models/File';
import FileSurvey from '../app/models/FileSurvey';
import Package from '../app/models/Package';
import Price from '../app/models/Price';
import Qrcode from '../app/models/Qrcode';
import Survey from '../app/models/Survey';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, File, Survey, FileSurvey, Qrcode, Package, Price, Cart];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
