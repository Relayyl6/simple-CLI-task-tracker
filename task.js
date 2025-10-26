import fs from "fs"
import path from "path";
import process from "process";

const filePath = path.resolve("tasks.json");

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

const readTasks = () => {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

const writeTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

const [ ,, command, ...args ] = process.argv


const addTasks = (description) => {
    const tasks = readTasks();

    if (!description) return console.error("a description must be added to any new task created");

    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`Task added succesfully (ID: ${newTask.id})`)
}

const updateTasks = (id, newDescription) => {
    const tasks = readTasks();
    // tasks is an array with objects [{}, {}, {}, {}], each of teh object is in the structure of the newTasks in the addTask function, so each {} can be a possible t
    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) return console.log("Task not found");

    task.description = newDescription;
    task.updatedAt = new Date().toISOString();

    console.log("Task updated successfully")
}

const deleteTasks = (id) => {
    let tasks = readTasks();
    const originalLength = tasks.length;

    tasks = tasks.filter(t => t.id !== parseInt(id));

    if (tasks.length === originalLength) return console.log("Task not found");

    writeTasks(tasks);
    console.log("Task deleted successfully")
}

const markTask = (id, status) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) return console.log("Task not found");

    task.status = status;
    task.updatedAt = new Date().toISOString();

    writeTasks(tasks);
    console.log(`Successfully Updated the status of task ${task.id} as ${status}`)
}

const listTasks = (status) => {
    const tasks = readTasks();

    let filteredTasks = tasks;

    if (status) filteredTasks = tasks.filter(t => t.status === status);

    if (filteredTasks.length === 0) return console.log("No tasks found");

    filteredTasks.forEach(task => {
        console.log(`${task.id}. [${task.status}] ${task.description}`)
    });
}


switch (command) {
    case "add":
        addTasks(args.join(" "));
        break;
    case "update":
        updateTasks(args[0], args.slice(1).join(" "));
        break;
    case "delete":
        deleteTasks(args[0]);
        break;
    case "mark":
        // args[1] can be "completed", or "in-progress"
        markTask(args[0], args[1]);
        break;
    case "list":
        listTasks(args[0]);
        break;
    default:
        console.log("Unknown command available commands are add")
        break;
}