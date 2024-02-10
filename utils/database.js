const Sequelize = require("sequelize");
const sequelize = new  Sequelize(
    "hariexpensetracker", // database name
    "root",   // user name
    "mysql123",      // password
    {
        host: 'localhost',
        dialect:'mysql'
        }
)   
module.exports = sequelize;