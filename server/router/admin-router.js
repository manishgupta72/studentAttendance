const express = require("express");
const adminController = require("../controller/admin-controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = express.Router();

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserById);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminController.deleteUserById);

router.route("/contacts").get(authMiddleware, adminController.getAllContacts);

router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminController.deleteContactById);
router.route("/attendance/:card").get(adminController.getAttendance);

module.exports = router;
