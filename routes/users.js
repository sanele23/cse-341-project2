const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const { isAuthenticated } = require("../middleware/authenticate");

// create two routes using the GET method
router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);
// POST
router.post("/", isAuthenticated, usersController.createUser);
// PUT
router.put("/:id", isAuthenticated, usersController.updateUser);
// DELETE
router.delete("/:id", isAuthenticated, usersController.deleteUser);

// export
module.exports = router;
