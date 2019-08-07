const Database = require("../helpers/Database");

module.exports = class Entry {
  constructor(id, task_id, status, created_at = Date.now(), deleted_at = null) {
    this.id = id;
    this.task_id = task_id;
    this.status = status;
    this.created_at = created_at;
    this.deleted_at = deleted_at;
  }
  table() {
    return "entries";
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

  create(task_id, status) {
    this.id = this.all().length + 1;
    this.task_id = task_id * 1;
    this.status = status;

    let DB = new Database();
    let database = DB.get();
    database.data[this.table()].push(this);

    return DB.update(database);
  }

  delete(id) {
    let DB = new Database();
    let database = DB.get();
    database.data[this.table()].find(x => x.id === id).deleted_at = Date.now();

    return DB.update(database);
  }
};
