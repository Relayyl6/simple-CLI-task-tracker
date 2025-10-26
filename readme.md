# Task Tracker

A minimal command-line task tracker implemented in Node.js. This project stores tasks in a local `tasks.json` file and exposes simple CLI commands to add, update, delete, mark, and list tasks.

## Project page

https://roadmap.sh/projects/task-tracker

## Features

- Add tasks with a description
- Update existing task descriptions
- Delete tasks by ID
- Mark tasks with statuses (e.g., `completed`, `in-progress`)
- List tasks (optionally filtered by status)

## Requirements

- Node.js 14+ (or newer) with ES module support

The repository's `package.json` sets `"type": "module"` so the code runs as an ES module.

## Install

No dependencies are required. From the project root run:

```powershell
# (optional) install dependencies if you add any later
npm install
```

## Run

Start the CLI using npm or node directly.

```powershell
# Using npm start (runs `node task.js`)
npm start

# Or run with node directly
node task.js <command> [args...]
```

## CLI Usage & Examples

Commands are dispatch based on the second argument (process.argv[2]). Examples below use PowerShell syntax.

- Add a task

```powershell
node task.js add "Buy milk"
# Output: Task added successfully (ID: 1)
```

- List all tasks

```powershell
node task.js list
# Output: 1. [todo] Buy milk
```

- Update a task description

```powershell
node task.js update 1 "Buy almond milk"
```

- Mark a task's status

```powershell
node task.js mark 1 completed
# or
node task.js mark 1 in-progress
```

- Delete a task

```powershell
node task.js delete 1
```

## Notes and tips

- The app creates a `tasks.json` file in the current working directory (where you run the command) if none exists. If you prefer the file next to the script file regardless of cwd, update `filePath` to use `import.meta.url` + `path.dirname`.
- The script is synchronous (uses `fs.readFileSync` / `fs.writeFileSync`). This is fine for small CLI tools, but if you embed this in a larger server consider converting to `fs.promises` async APIs.
- The CLI determines which function to run from `process.argv[2]`, so ensure your command is the second argument when calling `node`.

## Troubleshooting

- Permission errors when creating `tasks.json`: run the command in a folder where you have write permissions.
- Unexpected JSON parse errors: open `tasks.json` and verify it contains valid JSON (it should be an array `[]` of task objects).

## License

MIT
