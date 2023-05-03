const { Socket } = require("socket.io");
const { validateSocketToken } = require("../helpers");

const ChatMessages = require('../models/chats');
const chatMessages = new ChatMessages();

const socketController = async (socket = new Socket(), io) => {
  const xToken = socket.handshake.headers['x-token'];

  const user = await validateSocketToken(xToken);

  if (!user) {
    return socket.disconnect();
  }

  // Add users
  chatMessages.addUser(user);
  io.emit('active-users', chatMessages.usersArr);
  // Emit last 10 messages
  socket.emit('get-messages', chatMessages.last10Messages);

  // Connect to special room
  socket.join(user.id); // global | socket.id | user.id 

  // Disconnect
  socket.on('disconnect', () => {
    chatMessages.removeUser(user.id);
    io.emit('active-users', chatMessages.usersArr);
  });

  // Listen new message and send last 10 messages
  socket.on('send-message', ({ uid, message }) => {
    if (uid) {
      // Send private message
      socket.to(uid).emit('get-private-message', { from: user.name, message });

      return;
    }

    chatMessages.sendMessage(user.id, user.name, message);
    io.emit('get-messages', chatMessages.last10Messages);
  })
};

module.exports = {
  socketController,
};