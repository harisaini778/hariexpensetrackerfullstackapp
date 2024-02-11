const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Expenses = sequelize.define("expenses",{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey:true,
    },
    date : {
        type :Sequelize.STRING,
        allowNull : true,
    },
    category : {
        type :  Sequelize.STRING,
        allowNull : true
    },
    amount : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
});

module.exports = Expenses;