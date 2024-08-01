"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize, DataTypes, Op } = require("sequelize");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const login = {
    database: "mcdo",
    username: "admin",
    password: "admin"
};
// Connexion à la BDD
const sequelize = new Sequelize(login.database, login.username, login.password, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
    logging: false
});
// Vérifier la connexion
sequelize.authenticate()
    .then(() => console.log("Connexion à la base de données mcdo"))
    .catch(error => console.log(error));
module.exports = sequelize;
module.exports.Product = require("./Product");
module.exports.Category = require("./Category");
module.exports.User = require("./User");
module.exports.Cart = require("./Cart");
module.exports.Order = require("./Order");
module.exports.ProductOrder = require("./ProductOrder");
module.exports.ProductCart = require("./ProductCart");
sequelize.sync({ force: true })
    .then(async () => {
    console.log("Les modèles et les tables sont synchronisés.");
    const user = sequelize.models.User;
    const order = sequelize.models.Order;
    const category = sequelize.models.Category;
    const product = sequelize.models.Product;
    const cart = sequelize.models.Cart;
});
