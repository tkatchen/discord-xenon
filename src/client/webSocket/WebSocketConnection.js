const EventEmitter = require('events')
const Constants = require('../../utils/Constants')

class WebSocketConnection extends EventEmitter {
  constructor (client) {
    super(client)
    this.client = client
    this.ws = null
  }

  init (ws) {
    var scopedClient = this.client
    var handleEventScoped = this.handleEvent
    this.ws = ws
    var scopedWs = this.ws

    this.ws.on('message', function (d) {
      handleEventScoped(scopedClient, JSON.parse(d).op, JSON.parse(d), scopedWs)
      scopedClient.emit(JSON.parse(d).op)
    })
  }
  handleEvent (client, op, params, ws) {
    Constants.Events[op](client, params, ws)
  }

  send (header) {
    this.ws.send(header)
  }
}

module.exports = WebSocketConnection
