var Plan = require("../models/plan"); //Model de Planos

class PlansServices {
  async store(plans) {
    var errors = [];

    try {
      await Plan.create(plans);

      return true;
    } catch (err) {
      errors.push("Não foi possivel salvar o plano!");

      return errors;
    }
  }
}

module.exports = new PlansServices();
