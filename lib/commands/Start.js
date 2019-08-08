const Colors = require("colors/safe");
const Type = require("../helpers/Types");

const Create = require("./Create");
const Entry = require("../models/Entry");

module.exports = class Start {
  constructor(type = Type.types.entry, parent, status = "START") {
    this.type = type;
    this.parent = parent;
    this.status = status;
  }

  run(parent) {
    if (this.validate(parent)) {
      let item = new Create(this.type, null, parent, this.status);
      item.run();
    } else {
      console.log(Colors.bgRed("Task already started"));
    }
  }

  validate(parent) {
    let entries = new Entry();
    entries = entries.active().filter(entry => entry.task_id === parent * 1);
    if (entries.length > 0 && entries[entries.length - 1].status === "START") {
      return false;
    }
    return true;
  }
};
