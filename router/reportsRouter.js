// router/reportsRouter.js


const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reportsController");
const userAuthentication = require("../middleware/auth");



router.get("/getReportsPage", reportsController.getReportsPage);

router.post("/dailyReports",userAuthentication,reportsController.dailyReport);

router.post("/monthlyReports",userAuthentication,reportsController.monthlyReport);

router.post("/yearlyReports", userAuthentication , reportsController.yearlyReport);



module.exports = router;