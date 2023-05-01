const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.on('disconnect', () => { });

  socket.emit('last-ticket', `Ticket: ${ticketControl.lastTicket}`);
  socket.emit('update-queue', ticketControl.last4Tickets);
  socket.emit('pending-queue', ticketControl.tickets.length);


  socket.on('next-ticket', (payload, callBack) => {
    const ticket = ticketControl.nextTicket();

    callBack(ticket);

    // Emit to all except this
    socket.broadcast.emit('new-ticket', ticket);

    // Update dashboard.html
    socket.broadcast.emit('pending-queue', ticketControl.tickets.length);
  });

  // Assign new ticket
  socket.on('get-ticket', ({ dashboard }, callBack) => {
    if (!dashboard) {
      return callBack({
        status: false,
        msg: 'Dashboard is mandatory',
      });
    }

    const ticket = ticketControl.attendTicket(dashboard);
    // Update public.html
    socket.broadcast.emit('update-queue', ticketControl.last4Tickets);
    // Update dashboard.html
    socket.broadcast.emit('pending-queue', ticketControl.tickets.length);// emit all except this
    socket.emit('pending-queue', ticketControl.tickets.length); // emit this

    if (!ticket) {
      return callBack({
        status: false,
        msg: 'No pending tickets',
      });
    }

    return callBack({
      status: true,
      ticket,
    });
  });
};

module.exports = {
  socketController,
};