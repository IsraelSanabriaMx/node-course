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

const getEmployeById = (id) => {
  return new Promise((resolve, reject) => {
    const employe = employes.find((e) => e.id === id);

    (employe)
      ? resolve(employe)
      : reject(`The employe with id: ${id} not exists`)
  });
}

const getSalaryById = (id) => {
  return new Promise((resolve, reject) => {
    const salary = salaries.find((e) => e.id === id);

    (salary)
      ? resolve(salary)
      : reject(`The salary with id: ${id} not exists`)
  });
}

const id = 4;
// getEmployeById(id).then((employe) => {
//   console.log(employe);
// }).catch((error) => console.error(error));

// getSalaryById(id).then((salary) => {
//   console.log(salary);
// }).catch((error) => console.error(error));


// getEmployeById(id)
//   .then(employe => {
//     getSalaryById(id)
//       .then(salary => {
//         console.log(`The employe: ${employe.name}, has a salary of ${salary.salary}`);
//       })
//       .catch(error => console.error(error));
//   })
//   .catch(error => console.error(error));


let employeName;
getEmployeById(id)
  .then(employe => {
    employeName = employe?.name;
    return getSalaryById(id)
  })
  .then(salary => console.log(`The employe: ${employeName}, has a salary of ${salary.salary}`))
  .catch(error => console.error(error));