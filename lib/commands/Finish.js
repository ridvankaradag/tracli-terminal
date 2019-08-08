const Colors = require("colors/safe");
const Type = require("../helpers/Types");

const Create = require("./Create");
const Entry = require("../models/Entry");

module.exports = class Finish {
  constructor(type = Type.types.entry, parent, status = "FINISH") {
    this.type = type;
    this.parent = parent;
    this.status = status;
  }

  run(parent) {
    if (this.validate(parent)) {
      let item = new Create(this.type, null, parent, this.status);
      item.run();
    } else {
      console.log(Colors.bgRed("You can't pause or finish task before start"));
    }
  }

  validate(parent) {
    let entries = new Entry();
    entries = entries.active().filter(entry => entry.task_id === parent * 1);
    if (entries.length === 0) return false;
    if (entries.length > 0 && entries[entries.length - 1].status === "FINISH") {
      return false;
    }

    return true;
  }
};
