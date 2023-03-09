const Deadpool = {
  realName: 'Wade',
  realLastname: 'Winston',
  power: 'Regeneration',
  age: 50,
  getRealName: () => {
    return `${this.realName} ${this.realLastname}`;
  }
}

console.log(Deadpool);

const { realName, realLastname, power, age = 0 } = Deadpool;
console.log(realName, realLastname, power, age);

function printHero(hero) {
  const { realName, realLastname, power, age = 0 } = hero;
  console.log(realName, realLastname, power, age);
}
printHero(Deadpool);

function printHero2({ realName, realLastname, power, age = 0 }) {
  console.log(realName, realLastname, power, age);
}
printHero2(Deadpool);

const Heroes = ['Deadpool', 'Spiderman', 'Daredevil'];
const [h1, h2, h3] = Heroes;
console.log(h1, h2, h3);
const [, , daredevil] = Heroes;
console.log(daredevil);

