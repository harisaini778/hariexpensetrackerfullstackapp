const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
const sequelize = new  Sequelize(
    process.env.DB_NAME, // database name
    process.env.USER_NAME,   // user name
    process.env.PASSWORD, // password
    {
        host: process.env.HOST,
        dialect:'mysql'
        }
)   
module.exports = sequelize;