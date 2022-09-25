const { User, UserSchema } = require('./userModel');
const { Product, ProductSchema } = require('./productModels');
const { Customer, CustomerSchema } = require('./customersModels');


function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
}

module.exports =  setupModels;
