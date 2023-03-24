const colors = require('colors/safe');

const { createFile } = require('./tablas');
const { base, listar, hasta } = require('./yargs');

createFile(base, listar, hasta).then(resolve => {
  console.log(resolve, colors.blue('-> Created'));
}).catch(err => console.error('ERROR: ', err));






// https://www.themuse.com/advice/star-interview-method
// https://www.themuse.com/advice/6-types-of-stories-you-should-have-on-hand-for-job-interviews
// https://devskiller.com/45-behavioral-questions-to-use-during-non-technical-interview-with-developers/