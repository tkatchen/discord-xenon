class ClientManager {
  constructor (client) {
    this.ws = client.webSocket
    this.heartbeat = client.heartbeat
    this.token = client.token
    this.sequence = null
    this.sessionId = null

    this.ws.on(10, info => {
      this.heartbeat(info[0]['d']['heartbeat_interval'])
      this.ws.send({
        op: 2,
        d: {
          token: this.token,
          properties: {
            $os: process.platform,
            $browser: 'xenon',
            $device: 'xenon'
          }
        }
      })
    })
  }
  setToken (token) {
    this.token = token
  }

  setSession (sessionId) {
    this.sessionId = sessionId
  }

  setSequence (sequence) {
    this.sequence = sequence
  }
}
module.exports = ClientManager
