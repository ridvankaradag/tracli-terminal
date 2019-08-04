const os = require("os");
const fs = require("fs");
const Table = require("cli-table");
const Colors = require("colors/safe");

exports.app = args => {
  switch (args[0]) {
    case "list":
      this.list(args[1]);
      break;
    case "create":
      this.create(args);
      break;
    case "delete":
      this.delete(args);
      break;
    case "start":
      this.start(args);
      break;
    case "pause":
      this.pause(args);
      break;
    case "finish":
      this.finish(args);
      break;
    case "status":
      this.status();
      break;
    case "report":
      this.report();
      break;
    default:
      console.log("Invalid argument");
      break;
  }
};

exports.list = arg => {
  const database = this.readDatabase();
  if (arg) {
    const project_id = getNumericParam(arg, "-p=");
    const project = database.data.projects.find(x => x.id === project_id);
    console.log(`-----------------\n`);
    console.log(Colors.blue(`Project: ${project_id} - ${project.name}`));
    console.log(`\nTasks\n-----------------`);
    project.tasks
    .filter(task => task.deleted_at === null)
    .map(task => {
      console.log(
        `\n${Colors.yellow(task.id)} - ${Colors.bold(task.name)} | ${Colors.grey(new Date(task.created_at).toString())}`
      );
    });
  } else {
    console.log(`Projects\n-----------------`);
    database.data.projects
    .filter(project => project.deleted_at === null)
    .map(project => {
      console.log(
        `${Colors.yellow(project.id)} - ${Colors.bold(project.name)} | ${Colors.grey(new Date(
          project.created_at
        ).toString())}`
      );
    });
  }
};

exports.create = args => {
  const name = args[1];
  let database = this.readDatabase();

  if (args[2]) {
    const project_id = getNumericParam(args[2], "-p=");
    const tasks = database.data.projects.find(x => x.id === project_id).tasks;
    tasks.push(taskPattern(`${project_id}#`+(tasks.length + 1), name));
  } else {
    database.data.projects.push(
      projectPattern(database.data.projects.length + 1, name)
    );
  }

  updateDatabase(database);
};

exports.delete = (args) => {
  if(args.length > 2) {
    console.log(Colors.bgRed("Too much argument for deleting record"))
    return false;
  }

  let database = this.readDatabase();

  const project_id = getNumericParam(args[1], "-p=");
  const task_id = getStringParam(args[1], "-t=");

  if(project_id) {
    database.data.projects.find(x => x.id === project_id).deleted_at = Date.now();
  }

  if(task_id) {
    database.data.projects.find(p => p.id === task_id.split("#")[0] * 1).tasks.find(t => t.id === task_id).deleted_at = Date.now()
  }

  updateDatabase(database);
};

exports.start = (args) => {
  createTimeEntry(args, "start");
};

exports.pause = (args) => {
  createTimeEntry(args, "pause");
};

exports.finish = (args) => {
  createTimeEntry(args, "finish");
};

exports.status = () => {
  const database = this.readDatabase();
  let active_tasks = [];
  database.data.projects.map(project => {
    project.tasks.filter(task => task.entries.length > 0 && task.entries[task.entries.length -1].type !== "finish").map(task => {
      active_tasks.push(statusPattern(task));
    })
  })

  active_tasks.map(task => {
    process.stdout.write(task);
  })
}

exports.report = () => {
  const database = this.readDatabase();

  database.data.projects.map(project => {
    console.log(Colors.yellow(`\n${project.id} | ${project.name}`))
    let table = new Table({
      head: ['#','Task', 'Created on', 'Total Time' ]
    })
    let total_time = 0;
    project.tasks.map(task => {
      table.push([Colors.blue(task.id), Colors.bold(task.name), Colors.grey(new Date(task.created_at).toDateString()), millisecondToString(calculateTotalTime(task))])

      total_time += calculateTotalTime(task);
    })

    table.push(["","","",Colors.blue(millisecondToString(total_time))])


    console.log(table.toString())
  })

}

calculateTotalTime = task => {
  let entries = task.entries;

  let total_time = 0;

  for(let i = 0; i < entries.length; i++) {
    if(entries[i].type === "start" && entries[i+1]) {
      total_time += entries[i+1].created_at - entries[i].created_at;
    }
    else if (entries[i].type === "start" && !entries[i+1]) {
      total_time += Date.now() - entries[i].created_at;
    }
    
  }
  
  return total_time;
}

millisecondToString = time => {
  let timer = new Date(time);
  return `${timer.getUTCHours()}:${timer.getMinutes()}:${timer.getSeconds()}`;
}

createTimeEntry = (args, type) => {
  if(args.length > 2) {
    console.log(Colors.bgRed("Too much argument"))
    return false;
  }
  const task_id = args[1];
  const project_id = task_id.split("#")[0] * 1;

  let database = this.readDatabase();

  const entries = database.data.projects.find(p => p.id === project_id).tasks.find(t => t.id === task_id).entries;

  if(entries.length === 0 && type !== "start") {
    console.log(Colors.bgRed("You can't pause or finish task before start"))
    return false;
  }

  if(entries.length > 0 && entries[entries.length - 1].type === "start" && type === "start")
  {
    console.log(Colors.bgRed("Task already started"))
    return false;
  }

  if(entries.length > 0 && entries[entries.length - 1].type !== "start" && type === "pause") {
    console.log(Colors.bgRed("No active task for pausing"))
    return false;
  }

  if(entries.length > 0 && entries[entries.length - 1].type === "finish" && type === "finish") {
    console.log(Colors.bgRed("You can't pause or finish task before start"))
  }

  const entry_id = `${task_id}#${entries.length + 1}`;
  entries.push(entryPattern(entry_id, type));

  updateDatabase(database);
}

getWorkingDirectory = () => {
  return os.homedir() + "\\tracli";
};

getDatabase = () => {
  return getWorkingDirectory() + "\\database.json";
};

exports.readDatabase = () => {
  prepareDatabase();
  return JSON.parse(fs.readFileSync(getDatabase()));
};

createWorkplace = () => {
  fs.existsSync(getWorkingDirectory()) || fs.mkdirSync(getWorkingDirectory());
};

prepareDatabase = () => {
  createWorkplace();
  fs.existsSync(getDatabase()) ||
    fs.appendFileSync(getDatabase(), defaultDatabaseObject());
};

updateDatabase = database => {
  fs.existsSync(getDatabase()) || fs.unlinkSync(getDatabase());
  fs.writeFileSync(getDatabase(), JSON.stringify(database));
};

defaultDatabaseObject = () => {
  return JSON.stringify({
    start: Date.now(),
    data: {
      projects: []
    }
  });
};

projectPattern = (id, name) => {
  return {
    id: id,
    name: name,
    tasks: [],
    created_at: Date.now(),
    deleted_at: null
  };
};

taskPattern = (id, name) => {
  return {
    id: id,
    name: name,
    entries: [],
    created_at: Date.now(),
    deleted_at: null
  };
};

entryPattern = (id, type) => {
  return {
    id: id,
    type: type,
    created_at: Date.now(),
    deleted_at: null
  }
}

statusPattern = (task) => {
  const last_activity = task.entries[task.entries.length -1]
  let pattern = Colors.yellow(`\nTask: ${task.id}`+` | ${task.name}`) +
  `\nLast activity: ${Colors.blue(last_activity.type)} on ${Colors.grey(new Date(last_activity.created_at).toString())}\n`

  if(last_activity.type === "start") {
    pattern += `Current Timer: ${Colors.green(millisecondToString(Date.now() - last_activity.created_at))}`
  }
  return pattern;
}

getNumericParam = (arg, type) => {
  if (arg && arg.indexOf(type) === 0) {
    return arg.split(type)[1] * 1;
  } else {
    console.log(Colors.red("An error occuried"));
    return false;
  }
};

getStringParam = (arg, type) => {
  if (arg && arg.indexOf(type) === 0) {
    return arg.split(type)[1];
  } else {
    console.log(Colors.red("An error occuried"));
    return false;
  }
};
