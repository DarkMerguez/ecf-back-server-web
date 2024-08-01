"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Category = sequelize.define("Category", {
    title: DataTypes.TEXT
});
module.exports = Category;
