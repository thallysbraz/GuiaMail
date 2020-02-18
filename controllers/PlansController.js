const PlansService = require("../services/PlansService");

class PlansController {
  index(req, res) {
    return res.json({ msg: "ok, true" });
  }

  create(req, res) {
    res.render("plans/create", {
      title_msg: req.flash("title_msg"),
      list_msg: req.flash("list_msg")
    });
  }

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
    } else {
      req.flash("title_msg", result.title_msg);
      req.flash("list_msg", result.list_msg);
      res.redirect("/admin/plans/create");
    }
  }
}

module.exports = new PlansController();
