var express = require("express");
var router = express.Router();

var PlansController = require("../controllers/PlansController"); //Controler de planos

router.get("/admin/plans", PlansController.index); //Rota para listar todos os planos

router.get("/admin/plans/edit/:id", PlansController.edit);

router.get("/admin/plans/create", PlansController.create); //Render view de add plano
router.post("/plans/store", PlansController.store); //Rota pra salvar dados de criação

module.exports = router;
