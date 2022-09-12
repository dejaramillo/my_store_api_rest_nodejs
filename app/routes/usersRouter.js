const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  const userSize = size || 10;
  const users = [];

  for (let i = 0; i <= userSize; i++) {
    users.push(
      {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
      }
    )
  }

  res.json(users);
});


module.exports = router
