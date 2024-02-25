const Sequelize  = require('sequelize');

const sequelize = require("../utils/database");

const Order = sequelize.define("order", {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true,
    },

    paymentid : Sequelize.INTEGER,
    orderid : Sequelize.STRING,
    status : Sequelize.STRING,
});

module.exports =  Order;