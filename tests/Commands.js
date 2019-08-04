const expect = require("chai").expect;
const commands = require("../lib/commands");


describe("Projects", function() {
    it("it can create a project", function() {
        const start_projects_length = commands.readDatabase().data.projects.length;
        const args = ["create", "Test Project"];

        commands.app(args);
        const new_projects_length = commands.readDatabase().data.projects.length;
        expect(new_projects_length).to.greaterThan(start_projects_length);

    });

    it("it can delete a project", function() {
        const start_projects_length = commands.readDatabase().data.projects.filter(x => x.deleted_at === null).length;
        const last_project = commands.readDatabase().data.projects.filter(x => x.deleted_at === null)[start_projects_length - 1].id
        const args = ["delete", `-p=${last_project}`];

        commands.app(args);
        const new_projects_length = commands.readDatabase().data.projects.filter(x => x.deleted_at === null).length;
        expect(new_projects_length).to.lessThan(start_projects_length);
    })
})

describe("Tasks", function() {

})

describe("Entries", function() {

})

describe("Reports", function() {

})

describe("Status", function() {

})