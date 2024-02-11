const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.use(express.static("public"));

router.get("/",expenseController.getHomePage);
router.get("/getAllExpenses",expenseController.getAllExpenses);
router.get("/deleteExpenses/:id",expenseController.deleteExpenses);

router.post("/addExpense",expenseController.addExpense);
router.post("editExpense/:id",expenseController.editExpenses);

module.exports=router;