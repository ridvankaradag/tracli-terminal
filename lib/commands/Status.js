const Colors = require("colors/safe");

const Task = require("../models/Task");
const Entry = require("../models/Entry");

const Time = require("../helpers/Time");

module.exports = class Status {
  run() {
    let tasks = new Task();
    tasks = tasks.active();

    let entries = new Entry();
    entries = entries.active();

    let active_tasks = [];

    tasks.map(task => {
      let active_entries = entries.filter(entry => entry.task_id === task.id);
      if (
        active_entries.length > 0 &&
        active_entries[active_entries.length - 1].status !== "FINISH"
      ) {
        active_tasks.push({ task, active_entries });
      }
    });

    this.show(active_tasks);
  }
  show(active_tasks) {
    active_tasks.map(active_task => {
      console.log(this.statusPattern(active_task));
    });
  }

  statusPattern(data) {
    const last_activity = data.active_entries[data.active_entries.length - 1];
    let pattern =
      Colors.yellow(`\nTask: ${data.task.id}` + ` | ${data.task.name}`) +
      `\nLast activity: ${Colors.blue(last_activity.status)} on ${Colors.grey(
        new Date(last_activity.created_at).toString()
      )}\n`;
    if (last_activity.status === "START") {
      pattern += `Current Timer: ${Colors.green(
        Time.millisecondToString(Date.now() - last_activity.created_at)
      )}`;
    }
    return pattern;
  }
};
