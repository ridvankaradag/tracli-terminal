const fs = require('fs');

exports.app = (args) => {
    switch(args[0]) {
        case "list":
            this.list(args[1]);
            break;
        case "create":
            this.create();
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
}

exports.list  = (project) => {
    if(project && project.indexOf("-p=") === 0) {
        const project_id = project.split("-p=")[1] * 1;
        console.log(`You'll see tasks of ${project_id}`);
    }else {
        console.log(`You'll see list of projects or tasks`);
    }
}

exports.create = () => {
    console.log("You'll create project or task ");
}

exports.delete = () => {
    console.log("You'll delete project or task");
}

exports.start = () => {
    console.log("You'll start a task");
}

exports.pause = () => {
    console.log("You'll oause a task");
}

exports.finish = () => {
    console.log("You'll finish a task");
}