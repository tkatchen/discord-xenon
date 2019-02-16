const request = require('request');
const constants = require('../utils/Constants.js')

class ClientManager {
  constructor(client) {
    this.client = client;
    this.ws = client.webSocket
    this.token = client.token;
    this.sequence = null;
    this.sessionId = null;

    this.ws.on(10, (info) => {
      this.ws.heartbeat();
      this.heartbeatTimer(info[0]['d']['heartbeat_interval']);
      this.ws.send({
        op: 2,
        d: {
          token: this.token,
          properties: {
            $os: process.platform,
            $browser: 'xenon',
            $device: 'xenon',
          },
        },
      });
    });

    this.ws.on(0, (info) => {
      this.setSequence(info[0]['s']);
      this.client.webSocketManager.handle(info[0]['t'], info[0]);
    });

    this.ws.on(1, (info) => {
      console.log(info);
      this.ws.heartbeat();
    });

    this.ws.on(11, (info) => {
      console.log(info);
    });

    this.ws.on(9, (info) => {
      console.log(info);
    });

    this.ws.on(7, (info) => {
      console.log(info);
    });
  }
  setToken(token) {
    this.token = token;
  }

  setSession(sessionId) {
    this.sessionId = sessionId;
  }

  setSequence(sequence) {
    this.sequence = sequence;
  }

  send(path, data) {
    const headers = {
      'Authorization': `Bot ${this.token}`,
      'Content-Type': 'application/json',
    };
    request.post({
      url: `https://${constants.URL}/api/v6${path}`,
      body: JSON.stringify(data),
      headers: headers,
    }, (err, response, body) => {
      if(err){
        console.error(err)
      }
      if(body.code){
        console.error(new Error(JSON.parse(body).message))
      }
    });
  }

  get(path, data){
    const headers = {
      'Authorization': `Bot ${this.token}`,
      'Content-Type': 'application/json',
    };
    return new Promise(function(resolve, reject) {
      request.get({
        url: `https://${constants.URL}/api/v6${path}`,
        qs: JSON.stringify(data),
        headers: headers,
      }, (err, response, body) => {
        resolve(body)
      })
    });
  }

  // Sends a heartbeat every predefined time
  heartbeatTimer(time) {
    setInterval(() => this.ws.heartbeat(), time);
  }
}
module.exports = ClientManager;
