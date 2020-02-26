import * as Yup from 'yup';

import FileSurvey from '../models/FileSurvey';
import Package from '../models/Package';
import Survey from '../models/Survey';

class PackageController {
  async index(req, res) {
    const { page = 1, qtd = 20 } = req.query;

    const package_data = await Package.findAll({
      attributes: [
        'id',
        'credit',
        'email',
        'sms',
        'whatsapp',
        'price_credit',
        'price_email',
        'price_sms',
        'price_whatsapp',
        'price',
        'sale',
      ],
      where: {
        status: true,
      },
      order: [['id']],
      limit: qtd,
      offset: (page - 1) * qtd,
      include: [
        {
          model: Survey,
          as: 'products',
          attributes: ['title', 'description'],
          include: [
            {
              model: FileSurvey,
              as: 'image',
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
    const schema = Yup.object().shape({
      credit: Yup.number(),
      email: Yup.number(),
      sms: Yup.number(),
      whatsapp: Yup.number(),
      price_credit: Yup.number(),
      price_email: Yup.number(),
      price_sms: Yup.number(),
      price_whatsapp: Yup.number(),
      sale: Yup.number(),
      status: Yup.boolean(),
      idsurveys: Yup.number().required(),
    });

    let aux1 = 0;
    let aux2 = 0;
    let aux3 = 0;
    let aux4 = 0;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    if (req.body.price_credit && req.body.credit) {
      aux1 = req.body.price_credit * req.body.credit;
    }

    if (req.body.price_email && req.body.email) {
      aux2 = req.body.price_email * req.body.email;
    }

    if (req.body.price_sms && req.body.sms) {
      aux3 = req.body.price_sms * req.body.sms;
    }

    if (req.body.price_whatsapp && req.body.whatsapp) {
      aux4 = req.body.price_whatsapp * req.body.whatsapp;
    }

    const total = aux1 + aux2 + aux3 + aux4;

    req.body.price = total;

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
      price,
      sale,
    } = await Package.create(req.body);

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
      price,
      sale,
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
      price: Yup.number(),
      sale: Yup.number(),
      status: Yup.boolean(),
      idsurveys: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const idpackage = req.params.id;

    const package_data = await Package.findByPk(idpackage);

    if (!package_data) {
      return res.status(400).json({ erro: 'Package does not exists' });
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
      price,
      sale,
    } = await package_data.update(req.body);

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
      price,
      sale,
    });
  }

  async delete(req, res) {
    const idpackage = req.params.id;

    const package_data = await Package.findByPk(idpackage);

    console.log(package_data);

    if (!package_data) {
      return res.status(401).json({ error: `Package does not exist` });
    }

    let aux = {
      status: true,
    };

    if (package_data.status === true) {
      aux = {
        status: false,
      };
    }
    const { status } = await package_data.update(aux);

    return res.status(200).json({ ok: `Package ${status}` });
  }
}

export default new PackageController();
