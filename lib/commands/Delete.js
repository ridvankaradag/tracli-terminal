const Project = require("../models/Project");
const Task = require("../models/Task");
const Entry = require("../models/Entry");
const { types, short } = require("../helpers/Types");
const Param = require("../helpers/Param");

module.exports = class Delete {
  constructor({ args }) {
    this.type = short[Param.getShort(Param.getParams(args))];

    this.id = Param.getValue(
      Param.getParams(args),
      Param.getShort(Param.getParams(args))
    );

    this.parent = null;
  }

  run() {
    console.log(this.type);

    const cases = {
      [types.project]: () => new Project().delete(this.id),
      [types.task]: () => new Task().delete(this.id),
      [types.entry]: () => new Entry().delete(this.id)
    };

    cases[this.type]();
  }
};
