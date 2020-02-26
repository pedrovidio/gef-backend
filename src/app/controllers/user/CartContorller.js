import * as Yup from 'yup';

import Cart from '../../models/Cart';
import FileSurvey from '../../models/FileSurvey';
import Survey from '../../models/Survey';
import User from '../../models/User';

class CartController {
  async index(req, res) {
    const { page = 1, qtd = 20 } = req.query;

    const package_data = await Cart.findAll({
      attributes: [
        'id',
        'credit',
        'email',
        'sms',
        'whatsapp',
        'price',
        'status',
        'created_at',
      ],
      where: {
        idusers: req.userId,
      },
      order: [['id']],
      limit: qtd,
      offset: (page - 1) * qtd,
      include: [
        {
          model: Survey,
          attributes: ['title'],
          include: [
            {
              model: FileSurvey,
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    // return res.json(package_data.credit.sale);

    return res.json(package_data);
  }

  async store(req, res) {
    const { type } = await User.findByPk(req.userId);

    if (type === 'admin') {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const schema = Yup.object().shape({
      credit: Yup.number(),
      email: Yup.number(),
      sms: Yup.number(),
      whatsapp: Yup.number(),
      price_credit: Yup.number(),
      price_email: Yup.number(),
      price_sms: Yup.number(),
      price_whatsapp: Yup.number(),
      limited_credit: Yup.boolean(),
      limited_email: Yup.boolean(),
      limited_sms: Yup.boolean(),
      limited_whatsapp: Yup.boolean(),
      price: Yup.number(),
      idusers: Yup.number().required(),
      idsurveys: Yup.number().required(),
      idpackages: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const {
      id,
      credit,
      email,
      sms,
      whatsapp,
      price_credit,
      price_email,
      price_sms,
      price_whatsapp,
      limited_credit,
      limited_email,
      limited_sms,
      limited_whatsapp,
      price,
      status,
    } = await Cart.create(req.body);

    return res.json({
      id,
      credit,
      email,
      sms,
      whatsapp,
      price_credit,
      price_email,
      price_sms,
      price_whatsapp,
      limited_credit,
      limited_email,
      limited_sms,
      limited_whatsapp,
      price,
      status,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      credit: Yup.number(),
      email: Yup.number(),
      sms: Yup.number(),
      whatsapp: Yup.number(),
      price_credit: Yup.number(),
      price_email: Yup.number(),
      price_sms: Yup.number(),
      price_whatsapp: Yup.number(),
      limited_credit: Yup.boolean(),
      limited_email: Yup.boolean(),
      limited_sms: Yup.boolean(),
      limited_whatsapp: Yup.boolean(),
      price: Yup.number(),
      idusers: Yup.number().required(),
      idsurveys: Yup.number().required(),
      idpackages: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const idCart = req.params.id;

    const cart_data = await Cart.findByPk(idCart);

    if (!cart_data) {
      return res.status(400).json({ erro: 'Cart does not exists' });
    }

    const {
      id,
      credit,
      email,
      sms,
      whatsapp,
      price,
      created_at,
    } = await cart_data.update(req.body);

    return res.json({
      id,
      credit,
      email,
      sms,
      whatsapp,
      price,
      created_at,
    });
  }
}

export default new CartController();
