const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { v4: uuidv4 } = require('uuid');

class ProductService {

  async find() {
    const data = await models.Product.findAll();
    return data;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async create(body) {
    const res = await models.Product.create(body);
    return res;
  }


  async update(id, changes) {
    const product = await findOne(id)
    const newProduct = await product.update(changes)
    return newProduct;
  }


  async delete(id) {
    const product = await findOne(id);
    await product.destroy()
    return { message: true, id: id };
  }
}

module.exports = ProductService;
