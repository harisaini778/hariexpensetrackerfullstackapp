// app.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const userRouter = require("./router/userRouter");
const expenseRouter = require("./router/expenseRouter");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/",userRouter);
app.use("/user",userRouter);

app.use("/homePage",expenseRouter);
app.use("/expense",expenseRouter);

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
