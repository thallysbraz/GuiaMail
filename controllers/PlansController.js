class PlansController {
  index(req, res) {
    return res.json({ msg: "ok, true" });
  }

  create(req, res) {
    res.render("plans/create");
  }
}

module.exports = new PlansController();
