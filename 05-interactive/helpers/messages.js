const colors = require('colors/safe');

const showMenu = () => {
  return new Promise(resolve => {
    console.clear();
    console.log(colors.green('========================='));
    console.log(colors.green('           Menu          '));
    console.log(colors.green('=========================\n'));

    console.log(`${colors.green('1.')} Create task`);
    console.log(`${colors.green('2.')} List tasks`);
    console.log(`${colors.green('3.')} List completed tasks`);
    console.log(`${colors.green('4.')} List pendant tasks`);
    console.log(`${colors.green('5.')} Mark task as done`);
    console.log(`${colors.green('6.')} Delete task`);
    console.log(`${colors.green('0.')} Exit\n`);

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question('Choose an option: ', (answer) => {
      readLine.close();

      resolve(answer);
    });
  });
};

const pause = () => {
  return new Promise(resolve => {
    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`Press ${colors.green('ENTER')} to continue: `, (answer) => {
      readLine.close();
      resolve();
    });
  });
}

module.exports = {
  showMenu,
  pause,
};