var express = require("express");
var router = express.Router();

var PlansController = require("../controllers/PlansController"); //Controler de planos

router.get("/plans", PlansController.index);

router.get("/admin/plans/create", PlansController.create); //Render view de add plano
router.post("/plans/store", PlansController.store); //Rota pra salvar dados de criação

module.exports = router;
