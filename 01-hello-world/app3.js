console.log('Inicio');

setTimeout(() => {
  console.log('1');
}, 3000); // 3 seconds

setTimeout(() => {
  console.log('2');
}, 0); // 3 seconds

setTimeout(() => {
  console.log('3');
}, 0); // 3 seconds

console.log('Fin');