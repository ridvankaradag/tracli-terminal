const Database = require("../helpers/Database");

const Entry = require("./Entry");

class Task {
  constructor(
    id,
    project_id,
    name,
    created_at = Date.now(),
    deleted_at = null
  ) {
    this.id = id;
    this.project_id = project_id;
    this.name = name;
    this.created_at = created_at;
    this.deleted_at = deleted_at;
  }

  table() {
    return "tasks";
  }

  all() {
    let DB = new Database();
    return DB.get().data[this.table()];
  }

  active() {
    return this.all().filter(x => x.deleted_at === null);
  }

  find(id) {
    return this.all().find(x => x.id === id);
  }

  create(project_id, name) {
    this.project_id = project_id;
    this.id = this.all().length + 1;
    this.name = name;

    if (!project_id) {
      return false;
    }

    // let project = new Project();
    // if(!project.find(project_id)) {
    //     return false;
    // };

    let DB = new Database();
    let database = DB.get();
    database.data[this.table()].push(this);

    return DB.update(database);
  }

  delete(id) {
    let DB = new Database();
    let database = DB.get();
    try {
      database.data[this.table()].find(
        x => x.id === id
      ).deleted_at = Date.now();

      let entry = new Entry();
      database.data[entry.table()]
        .filter(x => x.task_id === id)
        .map(x => (x.deleted_at = Date.now()));
    } catch (error) {
      console.log(error);
      return false;
    }
    return DB.update(database);
  }
}

module.exports = Task;
