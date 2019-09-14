## Tracli

A command line app that tracks your time.

<img src="https://raw.githubusercontent.com/ridvankaradag/tracli-terminal/master/resources/preview.PNG" style="box-shadow: 6px 6px 11px #0000002b;margin: 0 auto">

### Requirements

- Node.js

### Installation

```sh
npm i -g tracli-terminal
```

### Usage

Firstly create a project named "Todo"

```
tracli create  "Todo Project"
```

Let's list all projects

```
tracli list
```

```
Projects
-------------
1 - Todo Project | Sat Sep 14 2019 19:00:00
```

Now we can add a task to project #1

```
tracli create  "Do Something" -p=1
```

Let's list all tasks of project #1

```
tracli list -p=1
```

```
Tasks
-------------
1 - Do Something | Sat Sep 14 2019 19:00:10
```

Now start a timer for task #1

```
tracli start  1
```

We can see active timers with status command

```
tracli status
```

```
Task: 1 | Do Something
Last activity: START on Sat Sep 14 2019 19:00:15
```

Finally list all time data by project

```
tracli report
```

#### Output

1 | Todo Project
|# | Task |Created on |Total Time
|--|--|--|--|
| 1 | Do Something | Sep 14 2019 | 00:11:42 |
| | | | 00:11:42|

### Commands

| Command | Usage                                                                                 |
| ------- | ------------------------------------------------------------------------------------- |
| status  | tracli status                                                                         |
| list    | tracli list for projects or tracli list **-p={project_id}** for tasks                 |
| create  | tracli create 'Project Name' or tracli create 'Task Name' **-p={project_id}**         |
| delete  | tracli delete **-p/-t/-e={item_id}**. p for projects, t for tasks, e for time entries |
| start   | tracli start **{task_id}**                                                            |
| pause   | tracli pause **{task_id}**                                                            |
| finish  | tracli finish **{task_id}**                                                           |
| report  | tracli report                                                                         |
| help    | tracli help or just tracli                                                            |

### Licence

MIT
