const Constants = require('../utils/Constants');
const EventEmitter = require('events');
const WebSocketConnection = require('./webSocket/WebSocketConnection');
const WebSocket = require('ws');
const ClientManager = require('./ClientManager');
const WebSocketManager = require('./webSocket/WebSocketManager');
const request = require('request');

/**
 * Represents a new discord Client
 * @extends EventEmitter
 * @type {class}
 */
class Client extends EventEmitter {
  constructor() {
    super();
    this.guildSize = null;
    this.ready = false;
    this.webSocket = new WebSocketConnection(this);
    this.webSocketManager = new WebSocketManager(this);
    this.token = null;
    this.guilds = new Map();
    this.channels = new Map();
    this.manager = new ClientManager(this);
    this.url = null;
  }

  /**
   * Logins the bot
   * @param {string} token
   * @example <Client>.login('NTAwMDk2MjM5ODgzMjU1ODQx.Dq5MLw.bm5tDRKW1Q8DebqcbfiBgNVq5Fg')
   */
  login(token = this.token) {
    if (!token || typeof token !== 'string') {
      return console.error(new TypeError(Constants.Errors.INVALID_CLIENT_TOKEN));
    }
    this.manager.setToken(token);
    this.token = token;

    request.get(`https://${Constants.URL}/api/gateway/bot?token=${this.token}`).on('data', (d) => {
      if (JSON.parse(d).code === 0) {
        return console.error(new Error(Constants.Errors.INVALID_CLIENT_TOKEN));
      }
      this.url = JSON.parse(d).url;
      this.webSocket.init(new WebSocket(this.url));
    });
  }

  heartbeatTimer(time) {
    setInterval(() => this.ws.heartbeat(), time);
  }

  send(path, data) {
    const headers = {
      'Authorization': `Bot ${this.token}`,
      'Content-Type': 'application/json',
    };
    request.post({
      url: `https://${Constants.URL}/api/v6${path}`,
      body: JSON.stringify(data),
      headers: headers,
    })
  }
}

module.exports = Client;
