module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new question', data => {
      socket.broadcast.emit('new question', data)
    })

    socket.on('hey', data => {
      socket.emit('hey', data)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
