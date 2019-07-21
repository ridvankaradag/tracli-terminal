const os = require("os");
const fs = require("fs");

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
    default:
      console.log("Invalid argument");
      break;
  }
};

exports.list = arg => {
  const database = readDatabase();
  if (arg) {
    const project_id = getNumericParam(arg, "-p=");
    const project = database.data.projects.find(x => x.id === project_id);
    console.log(`-----------------\n`);
    console.log(`Project: !${project_id} - ${project.name}`);
    console.log(`\nTasks\n-----------------`);
    project.tasks
    .filter(task => task.deleted_at === null)
    .map(task => {
      console.log(
        `\n!${task.id} - ${task.name} | ${new Date(task.created_at).toString()}`
      );
    });
  } else {
    console.log(`Projects\n-----------------`);
    database.data.projects
    .filter(project => project.deleted_at === null)
    .map(project => {
      console.log(
        `!${project.id} - ${project.name} | ${new Date(
          project.created_at
        ).toString()}`
      );
    });
  }
};

exports.create = args => {
  const name = args[1];
  let database = readDatabase();

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
    console.log("Too much argument for deleting record")
    return false;
  }

  let database = readDatabase();

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

createTimeEntry = (args, type) => {
  if(args.length > 2) {
    console.log("Too much argument")
    return false;
  }
  const task_id = args[1];
  const project_id = task_id.split("#")[0] * 1;

  console.log(project_id);

  let database = readDatabase();

  const entries = database.data.projects.find(p => p.id === project_id).tasks.find(t => t.id === task_id).entries;
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

readDatabase = () => {
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
  console.log(JSON.stringify(database));
  fs.existsSync(getDatabase()) || fs.unlinkSync(getDatabase());
  fs.writeFileSync(getDatabase(), JSON.stringify(database));
  console.log("Database updated");
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

getNumericParam = (arg, type) => {
  if (arg && arg.indexOf(type) === 0) {
    return arg.split(type)[1] * 1;
  } else {
    console.log("An error occuried");
    return false;
  }
};

getStringParam = (arg, type) => {
  if (arg && arg.indexOf(type) === 0) {
    return arg.split(type)[1];
  } else {
    console.log("An error occuried");
    return false;
  }
};
