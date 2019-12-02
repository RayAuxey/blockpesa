const router = require("express").Router();
const AccountController = require("../controllers/account.controller");

router.post("/new", AccountController.create);
router.get("/for/:userId", AccountController.show);
router.get("/fund/:id", AccountController.fundAccount);
router.get("/balance/:id", AccountController.getBalances);
router.post("/transfer", AccountController.sendMoney);

module.exports = router;
