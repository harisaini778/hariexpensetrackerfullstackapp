const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");


router.get("/getLeaderboardPage",leaderboardController.getLeaderBoardPage);
//router.get("/getLeaderboard",leaderboardController.getLeaderBoard);

module.exports = router;