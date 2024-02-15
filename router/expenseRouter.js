// router/expenseRouter

const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const userAuthentication = require("../middleware/auth");


router.use(express.static("public"));

router.get("/",expenseController.getHomePage);

router.get("/getAllExpenses",userAuthentication,
expenseController.getAllExpenses);

router.get("/deleteExpenses/:id",userAuthentication,
expenseController.deleteExpenses);

router.post("/addExpense",userAuthentication,
expenseController.addExpense);

router.post("editExpense/:id",userAuthentication,
expenseController.editExpenses);

module.exports=router;