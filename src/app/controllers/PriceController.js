import Price from '../models/Price';

class PriceController {
  async index(req, res) {
    const prices = await Price.findAll({
      attributes: ['id', 'credit', 'email', 'sms', 'whatsapp'],
    });

    return res.json(prices);
  }

  async update(req, res) {
    const price = await Price.findByPk(1);

    const prices = await price.update(req.body);

    return res.json(prices);
  }
}

export default new PriceController();
