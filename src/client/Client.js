const Constants = require('../utils/Constants')
const EventEmitter = require('events')
const WebSocketConnection = require('./webSocket/WebSocketConnection')
const https = require('https')
const WebSocket = require('ws')

class Client extends EventEmitter {

  constructor () {
    super()
    this.webSocket = new WebSocketConnection(this)
    this.token = null
  }

  /**
   * Logins the bot
   * @param {string} token
   */
  login (token = this.token) {
    if (!token || typeof token !== 'string') {
      return console.error(Constants.Errors.INVALID_CLIENT_TOKEN)
    }
    this.token = token
    // this.webSocket is removed in the https get
    var scopedWebSocket = this.webSocket
    https.get({host: 'discordapp.com', path: `/api/gateway/bot?token=${token}`}, function (res) {
      res.on('data', (d) => {
        if (JSON.parse(d).code === 0) {
          return console.error(Constants.Errors.INVALID_CLIENT_TOKEN)
        }
        var ws = new WebSocket(JSON.parse(d)['url'])
        scopedWebSocket.init(ws)
      })
    })
  }

  heartbeat (time) {
    setInterval(function () {}, time)
  }
}

module.exports = Client
