const Project = require("../models/Project");
const Task = require("../models/Task");
const Entry = require("../models/Entry");

const Type = require("../helpers/Types");
const Colors = require("colors/safe");

module.exports = class List {
  constructor(type, parent = null) {
    this.type = type;
    this.parent = parent;
  }

  run() {
    switch (this.type) {
      case Type.types.project:
        let project = new Project();
        return project.active();
      case Type.types.task:
        let task = new Task();
        return task.active();
      case Type.types.entry:
        let entry = new Entry();
        return entry.active();
      default:
        break;
    }
  }

  show() {
    let data = this.run();
    switch (this.type) {
      case Type.types.project:
        this.show_projects(data);
        break;
      case Type.types.task:
        this.show_tasks_by_project(data);
        break;
      case Type.types.entry:
        break;
      default:
        break;
    }
  }

  show_projects(data) {
    console.log(`Projects\n-----------------`);
    data.map(project => {
      console.log(
        `${Colors.yellow(project.id)} - ${Colors.bold(
          project.name
        )} | ${Colors.grey(new Date(project.created_at).toString())}`
      );
    });
  }

  show_tasks_by_project(data) {
    let project = new Project();
    project = project.find(this.parent);

    if (project) {
      console.log(`-----------------\n`);
      console.log(Colors.blue(`Project: ${project.id} - ${project.name}`));
      console.log(`\nTasks\n-----------------`);
      data
        .filter(task => task.project_id === project.id)
        .map(task => {
          console.log(
            `\n${Colors.yellow(task.id)} - ${Colors.bold(
              task.name
            )} | ${Colors.grey(new Date(task.created_at).toString())}`
          );
        });
    }
  }
};
