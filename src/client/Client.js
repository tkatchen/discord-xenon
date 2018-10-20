const Constants = require('../utils/Constants')
const EventEmitter = require('events')
const WebSocketConnection = require('./webSocket/WebSocketConnection')
const https = require('https')
const WebSocket = require('ws')
const ClientManager = require('./ClientManager')
const WebSocketManager = require('./webSocket/WebSocketManager')
const request = require('request')

class Client extends EventEmitter {

  constructor () {
    super()
    this.webSocket = new WebSocketConnection(this)
    this.webSocketManager = new WebSocketManager(this)
    this.token = null
    this.guilds = new Map()
    this.manager = new ClientManager(this)
    this.url = null
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
    this.manager.setToken(token)
    // this.webSocket is removed in the https get
    var scopedWebSocket = this.webSocket
    https.get({host: 'discordapp.com', path: `/api/gateway/bot?token=${token}`}, function (res) {
      res.on('data', (d) => {
        if (JSON.parse(d).code === 0) {
          return console.error(Constants.Errors.INVALID_CLIENT_TOKEN)
        }

        if (JSON.parse(d).shards) {
          this.url = JSON.parse(d)['url']
          console.log(this.url)
          var ws = new WebSocket(JSON.parse(d)['url'])
          scopedWebSocket.init(ws)
        }
      })
    })
  }

  /**
   * Sets up the heartbeat timer
   * @param {int} time
   */
  heartbeatTimer (time) {
    setInterval(() => this.ws.heartbeat(), time)
  }

  send (path, data) {
    var headers = {
      "Authorization": `Bot ${this.token}`,
      "Content-Type": 'application/json'
    }
    request.post({
        url: `https://${Constants.URL}/api/v6${path}`,
        body: JSON.stringify(data),
        headers: headers
      }, function (error) {
        this.emit('error', error)
    })
  }
}

module.exports = Client
