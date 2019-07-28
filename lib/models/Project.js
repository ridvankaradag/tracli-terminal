const Database = require("../helpers/Database");
const Task = require("./Task");

module.exports = class Project {
    constructor(id, name, created_at = Date.now(), deleted_at = null) {
        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.deleted_at = deleted_at;
    }
    table() {
        return "projects";
    }
    all() {
        let DB = new Database();
        return DB.get().data[this.table()];
    }

    active() {
        return this.all().filter(x => x.deleted_at === null);
    }

    find(id) {
        return this.all().find(x => x.id === id)
    }

    create(name) {
        this.id = this.all().length + 1;
        this.name = name;

        let DB = new Database();
        let database = DB.get();
        database.data[this.table()].push(this)

        return DB.update(database);
    }

    delete(id) {
        let DB = new Database();
        let database = DB.get();
        database.data[this.table()].find(x => x.id === id).deleted_at = Date.now()

        return DB.update(database);
    }

    tasks() {
        // let tasks = new Task();
        // return tasks.active().filter(x => x.project_id === this.id)
    }

}