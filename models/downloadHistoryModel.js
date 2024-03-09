const { DataTypes } = require("sequelize");
const Sequelize = require("../utils/database");

const downloadHistoryModel = Sequelize.define("downloadHistory", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

module.exports = downloadHistoryModel;
