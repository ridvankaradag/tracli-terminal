const Colors = require("colors/safe");
const Type = require("../helpers/Types");

const Create = require("./Create");
const Entry = require("../models/Entry");

module.exports = class Pause {
  constructor(type = Type.types.entry, parent, status = "PAUSE") {
    this.type = type;
    this.parent = parent;
    this.status = status;
  }

  run(parent) {
    if (this.validate(parent)) {
      let item = new Create({
        type: this.type,
        name: null,
        parent: parent,
        status: this.status
      });
      item.run();
    } else {
      console.log(Colors.bgRed("No active task for pausing"));
    }
  }

  validate(parent) {
    let entries = new Entry();
    entries = entries.active().filter(entry => entry.task_id === parent * 1);

    if (entries.length === 0) return false;
    if (entries.length > 0 && entries[entries.length - 1].status !== "START") {
      return false;
    }

    return true;
  }
};
