const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  res.send("Welcome to Project Two");
});

router.use("/users", require("./users"));

module.exports = router;
