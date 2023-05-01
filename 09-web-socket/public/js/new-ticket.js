// io() comes from ./socket.io/socket.io.js
// on ./public/index.html
const socket = io();

const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCreate = document.querySelector('#btnCreate');

socket.on('connect', () => btnCreate.disabled = false);

socket.on('disconnect', () => btnCreate.disabled = true);

btnCreate.addEventListener('click', () => {
  socket.emit('next-ticket', null, (ticket) => {
    lblNewTicket.innerHTML = ticket;
  });
});

socket.on('last-ticket', (lastTicket) => {
  lblNewTicket.innerHTML = lastTicket;
});