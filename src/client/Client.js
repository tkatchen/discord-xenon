const Constants = require('../utils/Constants')
const EventEmitter = require('events')
const ClientManager = require('./ClientManager')
const WebSocketManager = require('./webSocket/WebSocketManager')

class Client extends EventEmitter {

  constructor () {
    super()
    this.token = null
    this.manager = null
    this.webSocket = new WebSocketManager(this)
  }

  login (token = this.client.token) {
    this.manager = new ClientManager(this)
    if (!token || typeof token !== 'string') {
      throw new Error(Constants.Errors.INVALID_CLIENT_TOKEN)
    }
  }
}

module.exports = Client
