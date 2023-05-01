// io() comes from ./socket.io/socket.io.js
// on ./public/index.html
const socket = io();

const lblTicket1 = document.querySelector('#lblTicket1');
const lblDashboard1 = document.querySelector('#lblDashboard1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblDashboard2 = document.querySelector('#lblDashboard2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblDashboard3 = document.querySelector('#lblDashboard3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblDashboard4 = document.querySelector('#lblDashboard4');

const updateCard = (lbl, lblDash, ticket) => {
  if (ticket) {
    lbl.innerText = `Ticket ${ticket.number}`;
    lblDash.innerText = `Dashboard ${ticket.dashboard}`;
  }
}

socket.on('update-queue', (last4) => {
  const [ticket1, ticket2, ticket3, ticket4] = last4;

  updateCard(lblTicket1, lblDashboard1, ticket1);
  updateCard(lblTicket2, lblDashboard2, ticket2);
  updateCard(lblTicket3, lblDashboard3, ticket3);
  updateCard(lblTicket4, lblDashboard4, ticket4);
});