var Database = require("../models/index"); //Model de Planos

class PlansServices {
  constructor() {
    this.Plan = Database["Plan"];
  }

  //index para listar todos os planos
  async index(req, res) {
    try {
      var planos = await this.Plan.findAll();
      if (planos !== undefined || planos !== null) {
        return planos;
      } else {
        return null;
      }
    } catch (err) {
      return undefined;
    }
  }

  //store para criar os planos
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

  //validações dos planos
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

  //editar plano
  async getById(id) {
    try {
      var plano = await this.Plan.findByPk(id);
      return plano;
    } catch (err) {
      return undefined;
    }
  }

  //update para salvar atualização nos dados
  async update(id, data) {
    var erros = {};

    var isValid = this.validate(data, erros);

    if (isValid) {
      try {
        var plan = await this.getById(id);
        plan.title = data.title;
        plan.list = data.list;
        plan.client = data.client;
        plan.value = data.value;
        await plan.save();
        return true;
      } catch (err) {
        errors.system_msg = "Não foi possivel editar o plano!";
        return errors;
      }
    } else {
      return erros;
    }
  }

  //deactivate para desativar um plano
  async deactivated(id) {
    try {
      var plan = await this.getById(id);
      plan.deactivated = true;
      await plan.save();
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = new PlansServices();
