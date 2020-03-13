const PlansService = require("../services/PlansService");

class PlansController {
  // index para listar os planos na view
  async index(req, res) {
    var retorno = await PlansService.index();
    // return res.json(retorno);
    res.render("plans/index", { planos: retorno });
  }

  // para renderizar a view de criação
  create(req, res) {
    res.render("plans/create", {
      title_msg: req.flash("title_msg"),
      list_msg: req.flash("list_msg")
    });
  }

  // store para criar planos
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
      res.redirect("/admin/plans");
    } else {
      req.flash("title_msg", result.title_msg);
      req.flash("list_msg", result.list_msg);
      res.redirect("/admin/plans/create");
    }
  }

  // renderizar view de editar planos
  async edit(req, res) {
    var plan = await PlansService.getById(req.params.id);
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

  // update para atualizar os dados
  async update(req, res) {
    var { title, list, client, value, imports, id } = req.body;

    var plan = {
      title,
      list,
      client,
      value,
      import: imports
    };

    var result = await PlansService.update(id, plan);

    if (result == true) {
      res.redirect("/admin/plans");
    } else {
      req.flash("title_msg", result.title_msg);
      req.flash("list_msg", result.list_msg);
      res.redirect(`/admin/plans/edit/${id}`);
    }
  }

  // deactivated para desativar um plano
  async deactivated(req, res) {
    var id = req.params.id;
    var desativado = await PlansService.deactivated(id);
    if (desativado) {
      res.redirect("/admin/plans");
    } else {
      return res.json({ msg: "falha ao desativar plano" });
    }
  }

  // activate para ativar um plano

  async activate(req, res) {
    var id = req.params.id;
    var active = await PlansService.active(id);
    if (active) {
      res.redirect("/admin/plans");
    } else {
      return res.json({ msg: "falha ao ativar plano" });
    }
  }
}

module.exports = new PlansController();
