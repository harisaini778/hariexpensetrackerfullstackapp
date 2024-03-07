const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const creditExpenseController = require("../controllers/creditExpenseController");

router.get("/creditExpense", auth, creditExpenseController.getCreditExpense);
router.post("/creditExpense", auth, creditExpenseController.addCreditExpense);
router.get("/creditExpense/savings", auth, creditExpenseController.calculateSavings);

module.exports = router;
