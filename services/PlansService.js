var Database = require("../models/index"); //Model de Planos

class PlansServices {
  constructor() {
    this.Plan = Database["Plan"];
  }

  async store(plans) {
    var errors = {};

    if (plans.import != undefined) {
      plans.import = true;
    } else {
      plans.import = false;
    }

    var isValid = await this.validate(plans, errors);

    if (isValid) {
      try {
        await this.Plan.create(plans);

        return true;
      } catch (err) {
        errors.system_msg = "Não foi possivel salvar o plano!";

        return errors;
      }
    } else {
      return errors;
    }
  }

  validate(plan, errors) {
    var erroCount = 0;

    if (plan.title == undefined) {
      errors.title_msg = "o título é inválido";
      erroCount++;
    } else {
      if (plan.title.length < 3) {
        errors.title_msg = "o título é inválido";
        erroCount++;
      }
    }

    if (plan.list == undefined) {
      errors.list_msg = "A quantidade de listas e inválida";
      erroCount++;
    } else {
      if (plan.list < 1) {
        errors.list_msg = "A quantidade de listas e inválida";
        erroCount++;
      }
    }

    if (erroCount == 0) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new PlansServices();
