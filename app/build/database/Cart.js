"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");
const Cart = sequelize.define("Cart", {
    isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
});
Cart.belongsTo(User);
User.hasOne(Cart);
module.exports = Cart;
