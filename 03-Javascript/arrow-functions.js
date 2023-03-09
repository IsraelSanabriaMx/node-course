function sum(a, b = 10) {
  return a + b;
}

console.log(sum(5, 10));
console.log(sum(5));

const sumArrow = (a, b = 10) => {
  return a + b;
}

const sumArrow2 = (a, b) => a + b;

const greeting = () => 'Hello world';

console.log(sumArrow(5, 10));
console.log(sumArrow2(5, 10));
console.log(greeting());