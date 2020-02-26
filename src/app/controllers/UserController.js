import { Op } from 'sequelize';
import * as Yup from 'yup';

import File from '../models/File';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const { page = 1, qtd = 20 } = req.query;

    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
      where: {
        type: 'user',
        status: true,
      },
      order: [['name', 'DESC']],
      limit: qtd,
      offset: (page - 1) * qtd,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(5),
      type: Yup.string().required(),
      status: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ erro: 'User already exists' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(5),
      type: Yup.string(),
      status: Yup.string(),
      password: Yup.string()
        .min(5)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const idusers = req.params.id;
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(idusers);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ erro: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }

  async delete(req, res) {
    const idusers = req.params.id;

    const user = await User.findByPk(idusers);

    let aux = {
      status: true,
    };

    if (user.status === true) {
      aux = {
        status: false,
      };
    }

    const { id, name, email, status } = await user.update(aux);
    return res.json({ id, name, email, status });
  }

  async find(req, res) {
    const { page = 1, qtd = 20 } = req.query;
    const { name, email } = req.body;

    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
      where: {
        type: 'user',
        status: true,
        [Op.or]: [
          {
            name: { [Op.like]: `%${name}%` },
          },
          {
            email: { [Op.like]: `%${email}%` },
          },
        ],
      },
      limit: qtd,
      offset: (page - 1) * qtd,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(users);
  }
}

export default new UserController();
