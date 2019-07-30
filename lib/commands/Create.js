const Project = require("../models/Project");
const Task = require("../models/Task");
const Entry = require("../models/Entry");

class Create {
  constructor(type, name, parent = null) {
    this.type = type;
    this.name = name;
    this.parent = parent;
  }

  run() {
    switch (this.type) {
      case "PROJECT":
        let project = new Project();
        project.create(this.name);
        break;
      case "TASK":
        let task = new Task();
        task.create(this.parent, this.name);
        break;
      case "ENTRY":
        let entry = new Entry();
        entry.create(this.parent, this.name);
        break;
      default:
        break;
    }
  }
}
