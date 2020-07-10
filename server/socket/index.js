module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // let counter = 0;
    // setInterval(() => {
    //   socket.emit('hello', ++counter);
    // }, 1000);

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
