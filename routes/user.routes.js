const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.get("/", UserController.index);
router.post("/new", UserController.create);
router.post('/login', UserController.login)

module.exports = router;
