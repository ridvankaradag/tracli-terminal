const Project = require("../models/Project");
const Task = require("../models/Task");
const Entry = require("../models/Entry");

module.exports = class Delete {
  constructor(type, id, parent = null) {
    this.type = type;
    this.id = id;
    this.parent = parent;
  }

  run() {
    switch (this.type) {
      case "PROJECT":
        let project = new Project();
        return project.delete(this.id);
      case "TASK":
        let task = new Task();
        return task.delete(this.id);
      case "ENTRY":
        let entry = new Entry();
        return entry.delete(this.id);
      default:
        break;
    }
  }
};
