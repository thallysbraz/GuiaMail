const PlansService = require("../services/PlansService");

class PlansController {
  //index para listar os planos na view
  async index(req, res) {
    var retorno = await PlansService.index();
    //return res.json(retorno);
    res.render("plans/index", { planos: retorno });
  }

  //para renderizar a view de criação
  create(req, res) {
    res.render("plans/create", {
      title_msg: req.flash("title_msg"),
      list_msg: req.flash("list_msg")
    });
  }
  //store para criar planos
  async store(req, res) {
    var { title, list, client, value, imports } = req.body;

    var plan = {
      title,
      list,
      client,
      value,
      import: imports
    };

    var result = await PlansService.store(plan);

    if (result == true) {
      return res.json(result);
    } else {
      req.flash("title_msg", result.title_msg);
      req.flash("list_msg", result.list_msg);
      res.redirect("/admin/plans/create");
    }
  }
  //renderizar view de editar planos
  async edit(req, res) {
    var plan = await PlansService.edit(req.params.id);
    if (plan === undefined || plan === null) {
      res.json({ msg: "nada encontrado" });
    } else {
      res.render("plans/edit", {
        plan,
        title_msg: req.flash("title_msg"),
        list_msg: req.flash("list_msg")
      });
    }
  }
}

module.exports = new PlansController();
