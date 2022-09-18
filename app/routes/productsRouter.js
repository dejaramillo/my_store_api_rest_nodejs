const express = require('express');

const validatorHandler = require('./../middlewares/validatorHandler');
const {
  createdProdutSchema,
  updateProductSchema,
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
    } catch (error) {
      res.status(204).send('Product not found');
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createdProdutSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getProdutSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteResponse = await service.delete(id);
    res.json(deleteResponse);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
