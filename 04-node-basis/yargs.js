const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    description: 'Base to get the tabla'
  })
  .option('l', {
    alias: 'listar',
    type: 'boolean',
    default: false,
    description: 'Show the result of the tabla'
  })
  .option('h', {
    alias: 'hasta',
    type: 'number',
    description: 'Limit of operations'
  })
  .check((argv, options) => {
    if (isNaN(argv.b) || isNaN(argv.h)) {
      throw 'it must be a number'
    }

    return true;
  })
  .argv;

module.exports = argv;