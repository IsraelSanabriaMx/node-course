const inquirer = require('inquirer');
const colors = require('colors/safe');

const inquirerMenu = async () => {
  const questions = [
    {
      type: 'list',
      name: 'option',
      message: '¿Choose an option?',
      choices: [
        {
          value: 1,
          name: `${colors.red('1.')} Search city`,
        },
        {
          value: 2,
          name: `${colors.red('2.')} History`,
        },
        {
          value: 0,
          name: `${colors.red('0.')} Exit\n`,
        },
      ],
    }
  ];

  console.clear();
  console.log(colors.green('========================='));
  console.log(colors.white('           Menu          '));
  console.log(colors.green('=========================\n'));

  const prompt = inquirer.createPromptModule();
  const { option } = await prompt(questions);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'pause',
      message: `Press ${colors.green('ENTER')} to continue: `,
    },
  ];

  console.log('\n');
  const prompt = inquirer.createPromptModule();
  const { pause } = await prompt(question);

  return pause;
}

const createQuestion = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'text',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please add text to create question'
        }

        return true;
      }
    },
  ];

  const prompt = inquirer.createPromptModule();
  const { text } = await prompt(question);

  return text;
}

const interactiveList = async (options) => {
  const choices = options.map((option, index) => {
    const idx = index + 1;
    return {
      value: option.id,
      name: `${colors.green(idx + '.')} ${option.name}`,
    };
  });

  choices.unshift({
    value: '0',
    name: `${colors.green('0.')} Cancelar`,
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: '¿Choose an option?',
      choices,
    }
  ];

  const prompt = inquirer.createPromptModule();
  const { id } = await prompt(questions);

  return id;
};

const yesNoQuestions = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'yN',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please add text to create question'
        }

        return true;
      }
    }
  ];

  const prompt = inquirer.createPromptModule();
  const { yN } = await prompt(question);

  return yN;
};

const markTaksAsDone = async (tasks) => {
  const choices = tasks.map((task, index) => {
    const idx = index + 1;
    return {
      value: task.id,
      name: `${colors.green(idx + '.')} ${task.description}`,
      checked: task.createdAt ? true : false,
    };
  });

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select tasks',
      choices,
    }
  ];

  const prompt = inquirer.createPromptModule();
  const { ids } = await prompt(questions);

  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  createQuestion,
  interactiveList,
  yesNoQuestions,
  markTaksAsDone
};