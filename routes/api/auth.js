const express = require("express");
const router = express.Router();
const authControllerAPI = require("../../controllers/api/authControllerAPI");
const passport = require("../../config/passport");

router.post("/authenticate", authControllerAPI.authenticate);
router.post("/forgotPassword", authControllerAPI.forgotPassword);
router.post("/facebook_token",passport.authenticate("facebook-token"),authControllerAPI.authFacebookToken);

module.exports = router;