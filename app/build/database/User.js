"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = sequelize.define("User", {
    userName: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: {
        type: DataTypes.STRING,
        set(value) {
            const hash = bcrypt.hashSync(value, saltRounds);
            this.setDataValue("password", hash);
        },
    },
    // Mettre un rôle par défaut à 2 à l'user (Role 1 = employé, Role 2 = client)   
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 2
    }
});
module.exports = User;
