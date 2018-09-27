const EventEmitter = require('events')

class WebSocketConnection extends EventEmitter {
  constructor (client) {
    super(client)
    this.client = client
    this.sequence = null
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

  setSequence (sequence) {
    this.sequence = sequence
  }
}

module.exports = WebSocketConnection
