const constants = require('../utils/Constants');
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
    // guildSize recieved from the ready event, used to fire the ready event at a proper time
    this.guildSize = null;
    // Wether or not the ready event has fired
    this.ready = false;
    // The client websocket
    this.webSocket = new WebSocketConnection(this);
    // The websocket manager
    this.webSocketManager = new WebSocketManager(this);
    // The client manager
    this.manager = new ClientManager(this);

    /**
     * The token for your bot
     * @type {string}
     */
    this.token = null;

    /**
     * A list of guilds that the client is in
     * @type {Map.<Snowflake, Guild>}
     */
    this.guilds = new Map();
    /**
     * A list of channels that the client is in
     * @type {Map.<Snowflake, GuildChannel>}
     */
    this.channels = new Map();
  }

  /**
   * Logins the bot
   * @param {string} token The token for your application
   * @example <Client>.login('NTAwMDk2MjM5ODgzMjU1ODQx.Dq5MLw.bm5tDRKW1Q8DebqcbfiBgNVq5Fg')
   */
  login(token = this.token) {
    if (!token || typeof token !== 'string') {
      return console.error(new TypeError(constants.Errors.INVALID_CLIENT_TOKEN));
    }
    this.manager.setToken(token);
    this.token = token;

    request.get(`https://${constants.URL}/api/gateway/bot?token=${this.token}`).on('data', (d) => {
      if (JSON.parse(d).code === 0) {
        return console.error(new Error(constants.Errors.INVALID_CLIENT_TOKEN));
      }
      this.webSocket.init(new WebSocket(JSON.parse(d).url));
    });
  }
}

module.exports = Client;
