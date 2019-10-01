const { types } = require("../helpers/Types");
const Project = require("../models/Project");
const Task = require("../models/Task");
const Entry = require("../models/Entry");
const Param = require("../helpers/Param");

module.exports = class Create {
  constructor({ args, type, name, parent, status }) {
    this.type = type || (Param.hasParam(args) ? types.task : types.project);

    this.name = name || (args ? Param.getText(args) : null);

    this.parent =
      parent ||
      (args
        ? Param.hasParam(args)
          ? Param.getValue(
              Param.getParams(args),
              Param.getShort(Param.getParams(args))
            )
          : null
        : null);

    this.status = status || null;
  }

  run() {
    const cases = {
      [types.project]: () => new Project().create(this.name),
      [types.task]: () => new Task().create(this.parent, this.name),
      [types.entry]: () => new Entry().create(this.parent, this.status)
    };

    cases[this.type]();
  }
};
