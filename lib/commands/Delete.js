const Project = require("../models/Project");
const Task = require("../models/Task");
const Entry = require("../models/Entry");

class Delete {
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
        break;
      case "TASK":
        let task = new Task();
        return task.delete(this.id);
        break;
      case "ENTRY":
        let entry = new Entry();
        return entry.delete(this.id);
        break;
      default:
        break;
    }
  }
}

let a = new Delete("PROJECT", 1);
console.log(a.run());

let b = new Delete("TASK", 1);
console.log(b.run());

let c = new Delete("ENTRY", 1);
console.log(c.run());
