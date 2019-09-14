const Colors = require("colors/safe");
module.exports = class Help {
  constructor() {
    this.commands = [
      {
        command: "status",
        text: "tracli status"
      },
      {
        command: "list",
        text:
          "tracli list for projects or tracli list -p={project_id} for tasks"
      },
      {
        command: "create",
        text:
          "tracli create 'Project Name' or tracli create 'Task Name' -p={project_id}"
      },
      {
        command: "delete",
        text:
          "tracli delete -p/-t/-e={item_id}. p for projects, t for tasks, e for time entries"
      },
      {
        command: "start",
        text: "tracli start {task_id}"
      },
      {
        command: "pause",
        text: "tracli pause {task_id}"
      },
      {
        command: "finish",
        text: "tracli finish {task_id}"
      },
      {
        command: "report",
        text: "tracli report"
      },
      {
        command: "help",
        text: "tracli help or just tracli"
      }
    ];
  }
  run() {
    console.log(
      `Welcome to ${Colors.blue(
        "Tracli"
      )}. Feel free to contact with ${Colors.red(
        "ridvnkaradag@gmail.com"
      )}.\nGithub: ${Colors.bold(
        "https://github.com/ridvankaradag/tracli-terminal"
      )}`
    );
    this.commands.map(c => {
      console.log();
      console.log(Colors.yellow(c.command));
      console.log(c.text);
    });
  }
};
