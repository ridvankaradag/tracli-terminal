const expect = require("chai").expect;

describe("Projects", function() {
  it("it should list all projects");
  it("it should create a project");
  it("it should delete a project");
  it("it shouldn't delete a project if id doesn't match");
});

describe("Tasks", function() {
  it("it should list all task by project");
  it("it should create a task");
  it("it shouldn't create a task if project id doesn't match");
  it("it should delete a task");
  it("it shouldn't delete a task if id doesn't match");
});

describe("Entries", function() {
  it("it should start task");
  it("it shouldn't start task when last entry is 'start'");
  it("it should pause task");
  it("it shouldn't pause task when last entry is 'pause'");
  it("it shouldn't pause task when last entry is 'finish'");
  it("it should finish task");
  it("it shouldn't finish task when last entry is 'finish'");
});

describe("Status", function() {
  it("it should show active tasks");
  it("it should show paused tasks");
  it("it shouldn't show finished tasks");
});

describe("Report", function() {
  it("it should show report successfully");
});
