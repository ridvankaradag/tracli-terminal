const os = require("os");
const fs = require("fs");

module.exports = class Workspace {
  dir() {
    return os.homedir() + "\\tracli";
  }

  create() {
    fs.mkdirSync(this.dir());
    return this.get();
  }

  get() {
    if (fs.existsSync(this.dir())) {
      return this.dir();
    } else {
      return this.create();
    }
  }
};
