const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");

const Cart = sequelize.define("Cart", {
    isPaid: DataTypes.BOOLEAN
})


Cart.belongsTo(User);
User.hasOne(Cart);


module.exports = Cart;