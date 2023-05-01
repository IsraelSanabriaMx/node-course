// io() comes from ./socket.io/socket.io.js
// on ./public/index.html
const socket = io();

// Validate params
const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('dashboard')) {
  window.location = '/';
  throw new Error('Dashboard is mandadory');
}

// Selectors
const lblDashboard = document.querySelector('#lblDashboard');
const lblAttending = document.querySelector('#lblAttending');
const btnNext = document.querySelector('#btnNext');
const pendingTickets = document.querySelector('#pendingTickets');
const lblPendings = document.querySelector('#lblPendings');

// Defaults
const dashboard = searchParams.get('dashboard');
lblDashboard.innerHTML = `Dashboard: ${dashboard}`;
pendingTickets.style.display = 'none';

// Attend new tickets
btnNext.addEventListener('click', () => {
  socket.emit('get-ticket', { dashboard }, ({ status, msg, ticket }) => {
    if (!status) {
      pendingTickets.style.display = 'block';
      lblAttending.innerHTML = `none`;

      return;
    }

    lblAttending.innerHTML = `Ticket: ${ticket.number}`;
  });
});

// Listen pendings
socket.on('pending-queue', (pendings) => {
  if (pendings === 0) {
    lblPendings.style.display = 'none';
  } else {
    lblPendings.style.display = 'block';
  }

  lblPendings.innerHTML = pendings;
})