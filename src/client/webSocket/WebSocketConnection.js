const EventEmitter = require('events')

class WebSocketConnection extends EventEmitter {
  constructor (client) {
    super()
    this.client = client
    this.ws = null
  }

  init (ws) {
    this.ws = ws
    var forSomeReasonScopingSucks = this
    this.ws.on('message', function (d) {
      forSomeReasonScopingSucks.emit(JSON.parse(d).op, [JSON.parse(d)])
    })
  }

  send (header) {
    this.ws.send(JSON.stringify(header))
  }

  heartbeat () {
    this.send({
      op: 1,
      d: this.client.manager.sequence
    })
  }
}

module.exports = WebSocketConnection
