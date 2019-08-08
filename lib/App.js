const Types = require("./helpers/Types");
const Param = require("./helpers/Param");

const Create = require("./commands/Create");
const Delete = require("./commands/Delete");
const Start = require("./commands/Start");
const Pause = require("./commands/Pause");
const Finish = require("./commands/Finish");
const List = require("./commands/List");
const Status = require("./commands/Status");
const Report = require("./commands/Report");

module.exports = class App {
  constructor(args) {
    this.args = args;
  }

  start() {
    if (this.validate()) {
      switch (this.args[0]) {
        case "list":
          let type, hasParam, short, value;
          hasParam = Param.hasParam(this.args);

          if (hasParam) {
            short = Param.getShort(Param.getParams(this.args));
            value = Param.getValue(Param.getParams(this.args), short);
            if (short === "p") type = Types.types.task;
            else if (short === "t") type = Types.types.entry;
          } else {
            type = Types.types.project;
          }

          if (type) {
            let list = new List(type, hasParam ? value : null);
            list.show();
          }
          break;
        case "create":
          let item = new Create(
            Param.hasParam(this.args) ? Types.types.task : Types.types.project,
            Param.getText(this.args),
            Param.hasParam(this.args)
              ? Param.getValue(
                  Param.getParams(this.args),
                  Param.getShort(Param.getParams(this.args))
                )
              : null
          );
          item.run();
          break;
        case "delete":
          if (Param.hasParam(this.args)) {
            let item = new Delete(
              Types.short[Param.getShort(Param.getParams(this.args))],
              Param.getValue(
                Param.getParams(this.args),
                Param.getShort(Param.getParams(this.args))
              )
            );
            item.run();
          }
          break;
        case "start":
          if (this.args[1]) {
            let entry = new Start();
            return entry.run(this.args[1]);
          }
          break;
        case "pause":
          if (this.args[1]) {
            let entry = new Pause();
            return entry.run(this.args[1]);
          }
          break;
        case "finish":
          if (this.args[1]) {
            let entry = new Finish();
            return entry.run(this.args[1]);
          }
          break;
        case "status":
          let status = new Status();
          status.run();
          break;
        case "report":
          let report = new Report();
          report.run();
          break;
        default:
          console.log("Invalid argument");
          break;
      }
    }
  }

  validate() {
    return Types.commands.includes(this.args[0]);
  }
};
