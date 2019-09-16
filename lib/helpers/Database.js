const fs = require("fs");

const Workspace = require("./Workspace");

module.exports = class Database {
  read() {
    let workspace = new Workspace();
    return workspace.get() + "database.json";
  }

  init() {
    fs.appendFileSync(this.read(), this.default());
    return this.get();
  }

  update(database) {
    if (fs.existsSync(this.read())) {
      fs.unlinkSync(this.read());
    }

    fs.writeFileSync(this.read(), JSON.stringify(database));

    return this.get();
  }

  get() {
    if (fs.existsSync(this.read())) {
      return JSON.parse(fs.readFileSync(this.read()));
    } else {
      return this.init();
    }
  }

  default() {
    return JSON.stringify({
      start: Date.now(),
      data: {
        projects: [],
        tasks: [],
        entries: []
      }
    });
  }
};

exports.Database;
