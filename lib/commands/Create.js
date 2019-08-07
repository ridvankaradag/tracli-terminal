const { types } = require("../helpers/Types");
const Project = require("../models/Project");
const Task = require("../models/Task");
const Entry = require("../models/Entry");

module.exports = class Create {
  constructor(type, name = null, parent = null, status = null) {
    this.type = type;
    this.name = name;
    this.parent = parent;
    this.status = status;
  }

  run() {
    switch (this.type) {
      case types.project:
        let project = new Project();
        project.create(this.name);
        break;
      case types.task:
        let task = new Task();
        task.create(this.parent, this.name);
        break;
      case types.entry:
        let entry = new Entry();
        entry.create(this.parent, this.status);
        break;
      default:
        break;
    }
  }
};
