// app.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const userRouter = require("./router/userRouter");
const expenseRouter = require("./router/expenseRouter");
const purchaseMembershipRouter = require("./router/purchaseMembershipRouter");
const leaderboardRouter = require("./router/leaderBoardRouter");
const reportsRouter = require("./router/reportsRouter");
//const historyRouter = require("./router/downloadHistoryRouter");


const resetPasswordRouter = require("./router/resetPasswordRouter");
const creditExpenseRouter = require("./router/creditExpenseRouter");

const User = require("./models/userModels");
const Expense =  require("./models/expenseModel");
const Order = require("./models/orderModel");
const ResetPassword = require("./models/resetPasswordModel");
const creditExpenseModel = require("./models/creditExpenseModel");
const downloadHistoryModel = require("./models/downloadHistoryModel");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/",userRouter);
app.use("/user",userRouter);

app.use("/homePage",expenseRouter);

app.use("/expense",expenseRouter);

app.use("/purchase",purchaseMembershipRouter);

app.use("/premium",leaderboardRouter);

app.use("/reports",reportsRouter);

app.use("/password",resetPasswordRouter);

app.use("/credit",creditExpenseRouter);

//app.use("/reports/history",historyRouter);

ResetPassword.belongsTo(User);
User.hasMany(ResetPassword);



User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(creditExpenseModel);
creditExpenseModel.belongsTo(User);

User.hasMany(downloadHistoryModel);
downloadHistoryModel.belongsTo(User);



sequelize
    .sync()
    .then((result) => {
        console.log("Database synchronized successfully");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Error synchronizing database:", err);
    });