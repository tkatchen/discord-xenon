const EventEmitter = require('events')
const WebSocketConnection = require('./WebSocketConnection')

class WebSocketManager extends EventEmitter {
  constructor (client) {
    super()
    this.client = client
  }

  create (gateway) {
    if (this.connection) {
      this.connection = new WebSocketConnection(this, gateway)
      return true
    }
  }
}

module.exports = WebSocketManager
