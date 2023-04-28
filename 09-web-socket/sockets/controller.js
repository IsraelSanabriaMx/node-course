const socketController = (socket) => {
  socket.on('disconnect', () => {
  });

  socket.on('fromClient', (payload, callBack) => {
    const id = 1231231231;
    callBack(id);

    // Emit to all except this
    socket.broadcast.emit('fromServer', payload);
  })
};

module.exports = {
  socketController,
};