const { educationCategories, videos, leaderboard, contactUs, noticeboard, register } = require("../controllers/clientControllers");
const controller = require("../controllers/Client/controller")

const router = require("express").Router();

router.post("/education", educationCategories);
router.post("/education/videos", videos);
router.post("/leaderboard", leaderboard);
router.post("/contactus", contactUs);
router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/noticeboard", noticeboard);
router.post("/verifyEmail", controller.verifyEmail);
router.post("/requestCfVerification", controller.generateCfVerificationRequestToken);
router.post("/verifyCfID", controller.verifyCfID);
router.get("/check/session", controller.checkSession);
router.post("/feedback", controller.userFeedback);
module.exports = router;