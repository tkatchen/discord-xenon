const EventEmitter = require('events')

class WebSocketConnection extends EventEmitter {
  constructor (manager, gateway) {
    super()
    this.manager = manager
    this.gateway = gateway
  }
}

module.exports = WebSocketConnection
