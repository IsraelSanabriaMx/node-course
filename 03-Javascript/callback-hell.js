const employes = [
  {
    id: 1,
    name: 'Israel'
  },
  {
    id: 2,
    name: 'Alex'
  },
  {
    id: 3,
    name: 'Cris'
  },
];

const salaries = [
  {
    id: 1,
    salary: 1000
  },
  {
    id: 2,
    salary: 1500
  },
];

const getEmployeById = (id, callbackHandler) => {
  const employe = employes.find((e) => e.id === id);

  if (employe) {
    callbackHandler(null, employe);
  } else {
    callbackHandler(`The employe with id: ${id} not exists`);
  }
}

const getSalaryById = (id, callbackHandler) => {
  const salary = salaries.find((e) => e.id === id);

  if (salary) {
    callbackHandler(null, salary);
  } else {
    callbackHandler(`The salary with id: ${id} not exists`);
  }
}

//Callback
getEmployeById(2, (err, employe) => {
  console.log(employe);
});

getEmployeById(10, (err, employe) => {

  if (err) {
    console.log('Error')

    return console.log(err);
  }

  console.log(employe);
});

getSalaryById(1, (err, salary) => {
  if (err) {
    console.log('Error')

    return console.log(err);
  }

  console.log(salary);
});

// Callback Hell
getEmployeById(1, (err, employe) => {
  if (err) {
    console.log('Error')

    return console.log(err);
  }

  getSalaryById(1, (err, salary) => {
    if (err) {
      console.log('Error')

      return console.log(err);
    }

    console.log(`The employe: ${employe.name}, has a salary of ${salary.salary}`);
  });
});