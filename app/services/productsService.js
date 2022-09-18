const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { v4: uuidv4 } = require('uuid');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index <= limit - 1; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

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
