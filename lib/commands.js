const os = require("os");
const fs = require("fs");

exports.app = args => {
  switch (args[0]) {
    case "list":
      this.list(args[1]);
      break;
    case "create":
      this.create(args[1]);
      break;
    case "delete":
      this.delete();
      break;
    case "start":
      this.start();
      break;
    case "pause":
      this.pause();
      break;
    case "finish":
      this.finish();
      break;
    default:
      console.log("Invalid argument");
      break;
  }
};

exports.list = project => {
  const database = readDatabase();
  console.log(`Projects\n-----------------`);
  database.data.projects.map(project => {
    console.log(
      `#${project.id} - ${project.name} | ${new Date(
        project.created_at
      ).toString()}`
    );
  });
};

exports.create = arg => {
  const name = getStringParam(arg, "-p=");
  let database = readDatabase();
  database.data.projects.push(
    projectPattern(database.data.projects.length + 1, name)
  );

  updateDatabase(database);
};

exports.delete = () => {
  console.log("You'll delete project or task");
};

exports.start = () => {
  console.log("You'll start a task");
};

exports.pause = () => {
  console.log("You'll oause a task");
};

exports.finish = () => {
  console.log("You'll finish a task");
};

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
  console.log(`Directory created on ${getWorkingDirectory()}`);
};

prepareDatabase = () => {
  createWorkplace();
  fs.existsSync(getDatabase()) ||
    fs.appendFileSync(getDatabase(), defaultDatabaseObject());
  console.log(`Database is ready ${getDatabase()}`);
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
