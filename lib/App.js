const Types = require("./helpers/Types");
const Param = require("./helpers/Param");

const Create = require("./commands/Create");

module.exports = class App {
  constructor(args) {
    this.args = args;
  }

  start() {
    if (this.validate()) {
      switch (this.args[0]) {
        // case "list":
        //   this.list(args[1]);
        //   break;
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
        // case "delete":
        //   this.delete(args);
        //   break;
        // case "start":
        //   this.start(args);
        //   break;
        // case "pause":
        //   this.pause(args);
        //   break;
        // case "finish":
        //   this.finish(args);
        //   break;
        // case "status":
        //   this.status();
        //   break;
        // case "report":
        //   this.report();
        //   break;
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
