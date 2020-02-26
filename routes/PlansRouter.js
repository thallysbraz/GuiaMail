var express = require("express");
var router = express.Router();

var PlansController = require("../controllers/PlansController"); //Controler de planos

router.get("/admin/plans", PlansController.index); //Rota para listar todos os planos

router.get("/admin/plans/edit/:id", PlansController.edit); //Render view de editar
router.post("/plans/update", PlansController.update); //Rota para salvar atualização de dados

router.get("/admin/plans/create", PlansController.create); //Render view de add plano
router.post("/plans/store", PlansController.store); //Rota pra salvar dados de criação

router.get("/plans;deactivate/:id", PlansController.deactivated); //Rota para desativar um plano

module.exports = router;
