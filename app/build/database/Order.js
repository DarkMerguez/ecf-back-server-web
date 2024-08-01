"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Cart = require("./Cart");
const Order = sequelize.define("Order", {
    status: DataTypes.BOOLEAN,
    date: DataTypes.DATE
});
Cart.hasMany(Order);
Order.belongsTo(Cart);
module.exports = Order;
