"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Product = require("./Product");
const Order = require("./Order");
const ProductOrder = sequelize.define("ProductOrder", {
    quantity: DataTypes.INTEGER
});
Product.belongsToMany(Order, { through: ProductOrder });
Order.belongsToMany(Product, { through: ProductOrder });
module.exports = ProductOrder;
