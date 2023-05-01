// io() comes from ./socket.io/socket.io.js
// on ./public/index.html
const socket = io();

// const stOnline = document.querySelector('#stOnline');
// const stOffline = document.querySelector('#stOffline');
// const txtMsg = document.querySelector('#txtMsg');
// const btnSend = document.querySelector('#btnSend');

// socket.on('connect', () => {
//   stOnline.style.display = 'inline-block';
//   stOffline.style.display = 'none';
// });

// socket.on('disconnect', () => {
//   stOnline.style.display = 'none';
//   stOffline.style.display = 'inline-block';
// });

// btnSend.addEventListener('click', () => {
//   const msg = txtMsg.value;
//   const payload = {
//     id: socket.id,
//     msg,
//   };

//   socket.emit('fromClient', payload, (id) => {
//     // console.log(id);
//   });
// });

// socket.on('fromServer', (payload) => {
//   console.log('fromServer', payload)
// });