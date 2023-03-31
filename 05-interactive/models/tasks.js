const colors = require('colors/safe');
const Task = require("./task");

class Tasks {
  tasks = {};

  constructor() {
    this.tasks = {};
  }

  get listArr() {
    const listArray = [];
    Object.keys(this.tasks).forEach(id => {
      const task = this.tasks[id];

      listArray.push(task);
    });

    return listArray;
  }

  setlistArrFromDB(data = []) {
    data.forEach(task => {
      return this.tasks[task.id] = task;
    });
  }

  createTask(description = '') {
    const task = new Task(description);
    this.tasks[task.id] = task;
  }

  getList() {
    this.listArr.forEach((task, index) => {
      const status = task.createdAt ? `${colors.green('Completed')}` : `${colors.red('Pendant')}`;
      const idx = index + 1;

      console.log(`${colors.green(idx + '.')} ${task.description} :: ${status}`);
    });
  }

  getListByStatus(completed = true) {
    let index = 1;

    this.listArr.forEach((task) => {
      const status = task.createdAt ? `${colors.green(task.createdAt)}` : `${colors.red('Pendant')}`;

      if (completed && task.createdAt) {
        console.log(`${colors.green(index + '.')} ${task.description} :: ${status}`);
        index++;
      } else if (!completed && !task.createdAt) {
        console.log(`${colors.red(index + '.')} ${task.description} :: ${status}`);
        index++;
      }
    });
  }

  removeTaskById(id) {
    if (this.tasks[id]) {
      delete this.tasks[id];
      console.log('Task removed successfully');
    }
  }

  toggleTaskStatus(idsArr = []) {
    this.listArr.forEach((task) => {
      if (idsArr.includes(task.id)) {
        task.createdAt = new Date().toISOString();
      } else {
        task.createdAt = null;
      }
    });
  }
};

module.exports = Tasks;
