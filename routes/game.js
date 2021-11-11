const router = require("express").Router();

router.get('/', GameController.getAll);


module.exports = router;