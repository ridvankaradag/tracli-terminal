const Table = require("cli-table");
const Colors = require("colors/safe");

const Project = require("../models/Project");
const Task = require("../models/Task");
const Entry = require("../models/Entry");

const Time = require("../helpers/Time");

module.exports = class Report {
  run() {
    let projects = new Project();
    projects = projects.active();
    projects.map(project => {
      console.log(Colors.yellow(`\n${project.id} | ${project.name}`));
      let table = new Table({
        head: ["#", "Task", "Created on", "Total Time"]
      });
      let total_time = 0;
      let tasks = new Task();
      tasks = tasks.active().filter(task => task.project_id === project.id);
      tasks.map(task => {
        table.push([
          Colors.blue(task.id),
          Colors.bold(task.name),
          Colors.grey(new Date(task.created_at).toDateString()),
          Time.millisecondToString(this.calculateTotalTime(task.id))
        ]);

        total_time += this.calculateTotalTime(task.id);
      });

      table.push([
        "",
        "",
        "",
        Colors.blue(Time.millisecondToString(total_time))
      ]);

      this.show(table);
    });
  }

  show(table) {
    return console.log(table.toString());
  }

  calculateTotalTime(task_id) {
    let entries = new Entry();
    entries = entries.active().filter(entry => entry.task_id === task_id);

    let total_time = 0;

    for (let i = 0; i < entries.length; i++) {
      if (entries[i].status === "START" && entries[i + 1]) {
        total_time += entries[i + 1].created_at - entries[i].created_at;
      } else if (entries[i].status === "START" && !entries[i + 1]) {
        total_time += Date.now() - entries[i].created_at;
      }
    }

    return total_time;
  }
};
