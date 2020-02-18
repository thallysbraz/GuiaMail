class PlansController {
  index(req, res) {
    return res.json({ msg: "ok, true" });
  }
}

module.exports = new PlansController();
