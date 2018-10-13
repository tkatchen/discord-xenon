class ClientManager {
  constructor (client) {
    this.client = client
    this.ws = client.webSocket
    this.heartbeatTimer = client.heartbeatTimer
    this.token = client.token
    this.sequence = null
    this.sessionId = null

    this.ws.on(10, info => {
      this.ws.heartbeat()
      this.heartbeatTimer(info[0]['d']['heartbeat_interval'])
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

    this.ws.on(0, info => {
      this.setSequence(info[0]['s'])
      this.client.webSocketManager.handle(info[0]['t'], info[0])
    })

    this.ws.on(1, info => {
      console.log(info)
      this.ws.heartbeat()
    })

    this.ws.on(11, info => {
      console.log(info)
    })

    this.ws.on(9, info => {
      console.log(info)
    })

    this.ws.on(7, info => {
      console.log(info)
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
