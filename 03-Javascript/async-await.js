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
};

const getSalaryById = (id) => {
  return new Promise((resolve, reject) => {
    const salary = salaries.find((e) => e.id === id);

    (salary)
      ? resolve(salary)
      : reject(`The salary with id: ${id} not exists`)
  });
};

const idUser = 3;

const getInfoUser = async (id) => {
  try {
    const employe = await getEmployeById(id);
    const salary = await getSalaryById(id);

    return `The employe: ${employe.name}, has a salary of ${salary.salary}`;
  } catch (error) {
    throw error;
  }
};

getInfoUser(idUser)
  .then(msg => {
    console.log('OK');
    console.log(msg)
  })
  .catch(error => {
    console.log('BAD');
    console.error(error)
  });