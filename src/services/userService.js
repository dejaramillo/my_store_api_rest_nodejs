const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const id = require('faker/lib/locales/id_ID');

const { models } = require('./../libs/sequelize');


class UserService {

  async find() {
    const data = await models.User.findAll();
    return data;
  }

  async create(data) {
    const newUser = await models.User.create(data)
    return newUser;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('Product not found');
    }
    return user;
  }


  async update(id, changes) {
    const user = await findOne(id);
    const newUser = await user.update(changes);
    return newUser;
  }

  async delete(id) {
    const user = await findOne(id);
    await user.destroy()
    return { message: true, id: id };
  }
}

module.exports = UserService;
