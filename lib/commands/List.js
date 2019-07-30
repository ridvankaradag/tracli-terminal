const Project = require("../models/Project");
const Task = require("../models/Task");
const Entry = require("../models/Entry");

class List {
  constructor(type, parent = null) {
    this.type = type;
    this.parent = parent;
  }

  run() {
    switch (this.type) {
      case "PROJECT":
        let project = new Project();
        return project.active();
        break;
      case "TASK":
        let task = new Task();
        return task.active();
        break;
      case "ENTRY":
        let entry = new Entry();
        return entry.active();
        break;
      default:
        break;
    }
  }
}

let a = new List("PROJECT");
console.log(a);
console.log(a.run());

let b = new List("TASK");
console.log(b.run());

let c = new List("ENTRY");
console.log(c.run());
