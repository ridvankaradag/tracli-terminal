const { commands } = require("./helpers/Types");

const Create = require("./commands/Create");
const Delete = require("./commands/Delete");
const Start = require("./commands/Start");
const Pause = require("./commands/Pause");
const Finish = require("./commands/Finish");
const List = require("./commands/List");
const Status = require("./commands/Status");
const Report = require("./commands/Report");
const Help = require("./commands/Help");

module.exports = class App {
  constructor(args) {
    this.args = args;
  }

  start() {
    if (!this.validate()) {
      const help = new Help();
      return help.run();
    }
    const cases = {
      list: () => new List({ args: this.args }).run(),
      create: () => new Create({ args: this.args }).run(),
      delete: () => new Delete({ args: this.args }).run(),
      start: () => (this.args[1] ? new Start().run(this.args[1]) : ""),
      pause: () => (this.args[1] ? new Pause().run(this.args[1]) : ""),
      finish: () => (this.args[1] ? new Finish().run(this.args[1]) : ""),
      status: () => new Status().run(),
      report: () => new Report().run(),
      help: () => new Help().run(),
      default: () => new Help().run()
    };

    cases[this.args[0] || "default"]();
  }

  validate() {
    return commands.includes(this.args[0]);
  }
};
