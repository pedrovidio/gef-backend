import * as Yup from 'yup';

import FileSurvey from '../models/FileSurvey';
import Qrcode from '../models/Qrcode';
import Survey from '../models/Survey';

class SurveyController {
  async index(req, res) {
    const { page = 1, qtd = 20 } = req.query;

    const surveys = await Survey.findAll({
      where: { status: true },
      limit: qtd,
      offset: (page - 1) * qtd,
      attributes: [
        'id',
        'title',
        'description',
        'link_input',
        'link_webrep',
        'created_at',
      ],
      include: [
        {
          model: FileSurvey,
          as: 'image',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Qrcode,
          as: 'qrcode',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json({
      surveys,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      link_input: Yup.string().required(),
      link_webrep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const surveyExists = await Survey.findOne({
      where: { link_input: req.body.link_input },
    });

    if (surveyExists) {
      return res.status(400).json({ erro: 'Survey already exists' });
    }

    const { id, title, description } = await Survey.create(req.body);

    return res.json({
      id,
      title,
      description,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      link_input: Yup.string(),
      link_webrep: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const survey = await Survey.findByPk(req.params.id);

    if (!survey) {
      return res.status(400).json({ erro: 'Survey does not exists' });
    }

    const { id, title, description, status } = await survey.update(req.body);

    return res.json({
      id,
      title,
      description,
      status,
    });
  }

  async delete(req, res) {
    const idsurveys = req.params.id;

    const survey = await Survey.findByPk(idsurveys);

    if (!survey) {
      return res.status(400).json({ erro: 'Survey already exists' });
    }

    let aux = {
      status: true,
    };

    if (survey.status === true) {
      aux = {
        status: false,
      };
    }
    const { status } = await survey.update(aux);

    return res.status(200).json({ ok: `Survey ${status}` });
  }
}

export default new SurveyController();
