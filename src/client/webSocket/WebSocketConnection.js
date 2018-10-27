const EventEmitter = require('events');

class WebSocketConnection extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
    this.ws = null;
  }

  init(ws) {
    this.ws = ws;
    this.ws.on('message', (d) => {
      this.emit(JSON.parse(d).op, [JSON.parse(d)]);
    });
  }

  send(header) {
    this.ws.send(JSON.stringify(header));
  }

  heartbeat() {
    this.send({
      op: 1,
      d: this.client.manager.sequence,
    });
  }
}

module.exports = WebSocketConnection;
