const express = require('express');
const UserService = require('../services/userService')

const router = express.Router();
const service = new UserService();


router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json(users)
  } catch (error) {
    next(error);
  }
});


router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const users = await service.findOne(id);
    res.status(200).json(users)
  } catch (error) {
    next(error);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser)
  } catch (error) {
    next(error);
  }
});


router.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const user = await service.update(id, body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
})


router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await service.delete(id);
    res.status(200).json(response)
  } catch (error) {

  }
})

module.exports = router
