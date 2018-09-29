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
      console.log(info[0]['t'])
      switch (info[0]['t']) {
        case 'READY' : {
          this.client.emit('ready')
          break
        }
        case 'CHANNEL_CREATE' : {
          break
        }
        case 'CHANNEL_UPDATE' : {
          break
        }
        case 'CHANNEL_DELETE' : {
          break
        }
        case 'CHANNEL_PINS_UPDATE' : {
          break
        }
        case 'GUILD_CREATE' : {
          break
        }
        case 'GUILD_UPDATE' : {
          break
        }
        case 'GUILD_DELETE' : {
          break
        }
        case 'GUILD_BAN_ADD' : {
          break
        }
        case 'GUILD_BAN_REMOVE' : {
          break
        }
        case 'GUILD_EMOJIS_UPDATE' : {
          break
        }
        case 'GUILD_INTEGRATIONS_UPDATE' : {
          break
        }
        case 'GUILD_MEMBER_ADD' : {
          break
        }
        case 'GUILD_MEMBER_REMOVE' : {
          break
        }
        case 'GUILD_MEMBER_UPDATE' : {
          break
        }
        case 'GUILD_MEMBERS_CHUNK' : {
          break
        }
        case 'GUILD_ROLES_CREATE' : {
          break
        }
        case 'GUILD_ROLES_UPDATE': {
          break
        }
        case 'GUILD_ROLES_DELETE': {
          break
        }
        case 'MESSAGE_CREATE' : {
          break
        }
        case 'MESSAGE_UPDATE' : {
          break
        }
        case 'MESSAGE_DELETE' : {
          break
        }
        case 'MESSAGE_DELETE_BULK' : {
          break
        }
        case 'MESSAGE_REACTION_ADD' : {
          break
        }
        case 'MESSAGE_REACTION_REMOVE' : {
          break
        }
        case 'MESSAGE_REACTION_REMOVE_ALL' : {
          break
        }
        case 'PRESENCE_UPDATE' : {
          break
        }
        case 'TYPING_START' : {
          break
        }
        case 'USER_UPDATE' : {
          break
        }
        case 'VOICE_STATE_UPDATE' : {
          break
        }
        case 'VOICE_SERVER_UPDATE' : {
          break
        }
        case 'WEBHOOKS_UPDATE' : {
          break
        }
      }
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
