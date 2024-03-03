const express = require("express");
const router = express.Router();
const formidableMiddleware = require('express-formidable');
const authconroller = require("../controller/auth-controller");
const {signupSchema,loginSchema}=require('../validation/auth-validation');
const validate=require('../middlewares/validate-middleware');
const authMiddleware=require('../middlewares/authMiddleware')
const multer=require('multer')
const upload = multer({ dest: 'uploads/' })
router.route("/").get(authconroller.home);


router.route("/register").post(formidableMiddleware(),authconroller.register);
router.route("/login").post(validate(loginSchema),authconroller.login);

router.route("/student").get(authMiddleware,authconroller.user);
//get product photo
router.route("/student-photo/:sid").get(authconroller.studentPhotoController);

module.exports = router;
