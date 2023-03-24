const fs = require('fs');
const colors = require('colors/safe');

const createFile = async (baseNumber = 1, listar = false, hasta = 10) => {
  try {
    let txt = '';

    for (i = 1; i <= hasta; i++) {
      const result = baseNumber * i;
      txt += `${baseNumber} x ${i} = ${result}\n`;
    }

    if (listar) {
      console.log(colors.cyan('==================='));
      console.log(colors.bgCyan(`    Tabla del ${baseNumber}    `));
      console.log(colors.cyan('==================='));
      console.log(txt);
    }

    fs.writeFileSync(`./files/tabla-${baseNumber}.txt`, txt);

    return colors.magenta(`Document: tabla-${baseNumber}.txt`);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createFile,
};