var express = require("express");
var router = express.Router();

var PlansController = require("../controllers/PlansController"); //Controler de planos

router.get("/plans", PlansController.index);

module.exports = router;
