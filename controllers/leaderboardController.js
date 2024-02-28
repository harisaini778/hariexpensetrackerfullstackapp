const path = require("path");

const User = require("../models/userModels");

const Expense = require("../models/expenseModel");

const sequelize = require("../utils/database");

exports.getLeaderBoardPage = (req,res,next) => {
    res.sendFile(
    path.join(__dirname, "../","public","views","leaderboard.html")
    );
};

// exports.getLeaderBoard = (req,res,next) => {
//     Expense.findAll({
//        attributes : [
//         [sequelize.fn("sum",sequelize.col("amount")),"totalExpense"],
//         [sequelize.col("user.name"),"name"],
//        ],
//        group : ["userId"],
//        include : [
//         {
//             model : User,
//             attributes : [],
//         },
//        ],
//        order : [[sequelize.fn("sum",sequelize.col("amount")),"DESC"]]
//     })
//     .then((expenses) => {
     
//      const result = expenses.map((expense) =>({
//      name : expense.getDataValue("name"),
//      amount : expense.getDataValue("totalExpense"),
//      }));
//     res.send(JSON.stringify(result));
//     })
//     .catch((err)=> console.log(err));
// };