const Project = require("../models/Project");
const Task = require("../models/Task");
const Entry = require("../models/Entry");

const Param = require("../helpers/Param");
const { types } = require("../helpers/Types");
const Colors = require("colors/safe");

module.exports = class List {
  constructor({ args }) {
    const hasParam = Param.hasParam(args);

    const short = hasParam ? Param.getShort(Param.getParams(args)) : null;
    //if has no "p" or "t" keyword or null, default is project
    this.type =
      short === "p" ? types.task : short === "t" ? types.entry : types.project;

    this.parent = hasParam
      ? Param.getValue(Param.getParams(args), short)
      : null;
  }

  run() {
    const cases = {
      [types.project]: () => this.show_projects(new Project().active()),
      [types.task]: () => this.show_tasks_by_project(new Task().active()),
      [types.entry]: () => this.show_entries_by_task(new Entry().active())
    };

    cases[this.type]();
  }

  show_projects(projects) {
    console.log(`Projects\n-----------------`);
    projects.map(project => {
      console.log(
        `${Colors.yellow(project.id)} - ${Colors.bold(
          project.name
        )} | ${Colors.grey(new Date(project.created_at).toString())}`
      );
    });
  }

  show_tasks_by_project(tasks) {
    let project = new Project();
    project = project.find(this.parent);

    if (project) {
      console.log(`-----------------\n`);
      console.log(Colors.blue(`Project: ${project.id} - ${project.name}`));
      console.log(`\nTasks\n-----------------`);

      tasks
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

  show_entries_by_task(entries) {
    console.log(entries);
    let task = new Task();
    task = task.find(this.parent);

    if (task) {
      console.log(`-----------------\n`);
      console.log(Colors.blue(`Task: ${task.id} - ${task.name}`));
      console.log(`\nTasks\n-----------------`);

      entries
        .filter(entry => entry.task_id === task.id)
        .map(entry => {
          console.log(
            `\n${Colors.yellow(entry.id)} - ${Colors.bold(
              entry.status
            )} | ${Colors.grey(new Date(entry.created_at).toString())}`
          );
        });
    }
  }
};
