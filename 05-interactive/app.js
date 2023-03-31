const {
  inquirerMenu,
  pause,
  createQuestion,
  removeTaskList,
  yesNoQuestions,
  markTaksAsDone,
} = require('./helpers/inquirer');
const { saveData, readData } = require('./helpers/fileHandler');
const Tasks = require('./models/tasks');

const main = async () => {
  let opt = '';
  const tasks = new Tasks();

  const data = readData();

  if (data) {
    tasks.setlistArrFromDB(data);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        // '1. Create task'
        const description = await createQuestion('Description:');
        tasks.createTask(description);
        break;
      case '2':
        // '2. List tasks'
        tasks.getList();
        break;
      case '3':
        // '3. List completed tasks'
        tasks.getListByStatus(true);
        break;
      case '4':
        // '4. List pendant tasks'
        tasks.getListByStatus(false);
        break;
      case '5':
        // '5. Mark task as done'
        const idsArr = await markTaksAsDone(tasks.listArr);

        const confirm = await yesNoQuestions('Are you sure to mark as done these tasks?');

        if (confirm) {
          tasks.toggleTaskStatus(idsArr);
        }
        break;
      case '6':
        // '6. Delete task'
        const id = await removeTaskList(tasks.listArr);

        if (id !== '0') {
          const confirm = await yesNoQuestions('Are you sure to remove this task?');

          if (confirm) {
            tasks.removeTaskById(id);
          }
        }
        break;
      default:
        break;
    }

    saveData(tasks.listArr);

    await pause();

  } while (opt !== '0');
}

main();