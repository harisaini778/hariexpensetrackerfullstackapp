const {Sequelize , DataTypes}  = require("sequelize");
const sequelize = require("../utils/database");

const CreditExpense = sequelize.define("CreditExpense",{

    id : {

        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey:true,
    },


    description : {

        type : Sequelize.STRING,
        unique : false,
        allowNull : false,

    },

    totalIncome : {
     
        type : Sequelize.INTEGER,
        defaultValue : 0,

    },

    totalSaving : {

        type : DataTypes.INTEGER,
        defaultValue : 0,
    },

    userId : {

        type : Sequelize.INTEGER,
        defaultValue : 0,
    }



});


module.exports = CreditExpense;