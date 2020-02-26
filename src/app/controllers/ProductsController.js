import FileSurvey from '../models/FileSurvey';
import Package from '../models/Package';
import Survey from '../models/Survey';

class ProductsController {
  async index(req, res) {
    const { page = 1, qtd = 20 } = req.query;

    const package_data = await Package.findAll({
      attributes: ['id', 'price', 'sale'],
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

    return res.json(package_data);
  }

  async find(req, res) {
    const package_data = await Package.findOne({
      attributes: ['id'],
      where: {
        id: req.params.id,
      },
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

    return res.json(package_data);
  }
}

export default new ProductsController();
