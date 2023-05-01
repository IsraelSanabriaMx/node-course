const { readData, saveData } = require('../helpers/fileHandler');

class Ticket {
  constructor(number = 0, dashboard = 0) {
    this.number = number;
    this.dashboard = dashboard;
  }
}

class TicketControl {
  constructor() {
    this.lastTicket = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.last4Tickets = [];

    this.init();
  }

  get toJson() {
    return {
      lastTicket: this.lastTicket,
      today: this.today,
      tickets: this.tickets,
      last4Tickets: this.last4Tickets,
    };
  }

  init() {
    const { lastTicket, today, tickets, last4Tickets } = readData();

    if (this.today === today) {
      this.lastTicket = lastTicket;
      this.tickets = tickets;
      this.last4Tickets = last4Tickets;
    } else {
      saveData(this.toJson);
    }
  }

  nextTicket() {
    this.lastTicket += 1;
    const ticket = new Ticket(this.lastTicket, null);
    this.tickets.push(ticket);

    saveData(this.toJson);

    return `Ticket: ${this.lastTicket}`;
  }

  attendTicket(dashboard) {
    if (this.tickets.length === 0) {
      return null;
    }

    // Remove from tickets
    const ticket = this.tickets.shift();
    // Assign dashboard
    ticket.dashboard = dashboard;
    // Add to the begining of the last4Tickets
    this.last4Tickets.unshift(ticket);

    // Remove if there are more than 4
    if (this.last4Tickets.length > 4) {
      this.last4Tickets.splice(-1, 1);
    }

    saveData(this.toJson);

    return ticket;
  }
}

module.exports = TicketControl;