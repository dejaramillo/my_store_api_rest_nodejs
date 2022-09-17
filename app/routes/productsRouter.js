const express = require('express');


const validatorHandler = require('./../middlewares/validatorHandler');
const {
  createdProdutSchema,
  updateProdutSchema,
  getProdutSchema,
} = require('./../schemas/productSchema');
const productService = require('./../services/productsService');

const router = express.Router();
const service = new productService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get(
  '/:id',
  validatorHandler(getProdutSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
      res.status(204).send('Product not found');
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createdProdutSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch('/:id',
validatorHandler(getProdutSchema, 'params'),
validatorHandler(updateProdutSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteResponse = await service.delete(id);
  res.json(deleteResponse);
});

module.exports = router;
