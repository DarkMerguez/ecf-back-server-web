"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Models :
const { Category } = require("./database");
const { Product } = require("./database");
const { User } = require("./database");
const { Cart } = require("./database");
const { ProductCart } = require("./database");
const { Order } = require("./database");
const { ProductOrder } = require("./database");
const sequelize = require("./database");
const { Op } = require("sequelize");
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.use(express.json());
app.use(cors());
// Récupérer toutes les commandes pas encore validées
app.get("/orders/inprogress", async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                status: 0
            }
        });
        orders.length > 0 ? res.status(200).json(orders) : res.status(400).json({ message: "Aucune commande en attente de validation" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des commandes" });
    }
});
// Récupérer toutes les commandes effectuées
app.get("/orders/all", async (req, res) => {
    try {
        const orders = await Order.findAll();
        orders.length > 0 ? res.status(200).json(orders) : res.status(400).json({ message: "Aucune commande" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des commandes" });
    }
});
// Marquer une commande comme validée
app.put("/order/validate/:id", async (req, res) => {
    try {
        const validation = {
            status: 1
        };
        const order = await Order.findByPk(req.params.id);
        if (order) {
            await Order.update(validation, {
                where: {
                    id: req.params.id
                }
            });
            console.log(order);
            res.status(200).json({ message: "Commande validée avec succès" });
        }
        else {
            res.status(400).json({ message: "Pas de commande trouvée avec cet ID" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des commandes" });
    }
});
// Ajouter un produit au panier
app.post("/addtocart/:productid/:userid", async (req, res) => {
    const user = await User.findByPk(req.params.userid);
    const cart = await Cart.findOne({
        where: {
            userId: user.id
        }
    });
    const product = await Product.findByPk(req.params.productid);
    const addedProduct = {
        ProductId: product.id,
        CartId: cart.id
    };
    if (cart && product) {
        try {
            await ProductCart.create(addedProduct);
            res.status(200).json({ message: "Produit ajouté au panier" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    }
    else {
        res.status(400).json({ message: "Pas de panier et/ou de produit trouvé avec ces id" });
    }
});
// Supprimer un produit du panier
app.delete("/deletefromcart/:productid/:userid", async (req, res) => {
    const user = await User.findByPk(req.params.userid);
    const cart = await Cart.findOne({
        where: {
            userId: user.id
        }
    });
    const product = await Product.findByPk(req.params.productid);
    if (cart && product) {
        try {
            await ProductCart.destroy({
                where: {
                    [Op.and]: [
                        { ProductId: product.id },
                        { CartId: cart.id }
                    ]
                }
            });
            res.status(200).json({ message: "Produit supprimé du panier" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    }
    else {
        res.status(400).json({ message: "Pas de panier et/ou de produit trouvé avec ces id" });
    }
});
// Toutes les routes du use case ont été faites,
// J'aurais pu rajouter les routes les plus simples (get/users,post/product...) 
// mais il est 17H00 et j'ai favorisé le plus difficile et ce qui était demandé dans la consigne :)
app.listen(8041, () => {
    console.log("Youhouuuuu serveur lancé sur localhost:8041");
});
