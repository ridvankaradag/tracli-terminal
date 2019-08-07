const Type = require("../helpers/Types");

const Create = require("./Create");

module.exports = class Pause {
  constructor(type = Type.types.entry, parent, status = "PAUSE") {
    this.type = type;
    this.parent = parent;
    this.status = status;
  }

  run(parent) {
    if (this.validate()) {
      let item = new Create(this.type, null, parent, this.status);
      item.run();
    }
  }

  validate() {
    return true;
  }
};
