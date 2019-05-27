class WebSocketManager {
  constructor (client) {
    this.client = client
    this.ws = client.ws
    this.handlers = {}

    // Add all of the handlers
    this.add('READY', require('./handlers/ready'))
    this.add('CHANNEL_CREATE', require('./handlers/channelCreate'))
    this.add('CHANNEL_UPDATE', require('./handlers/channelUpdate'))
    this.add('CHANNEL_DELETE', require('./handlers/channelDelete'))
    this.add('CHANNEL_PINS_UPDATE', require('./handlers/channelPinsUpdate'))
    this.add('GUILD_BAN_ADD', require('./handlers/guildBanAdd'))
    // this.add('GUILD_BAN_REMOVE', require('./handlers/guildBanRemove'))
    this.add('GUILD_CREATE', require('./handlers/guildCreate'))
    this.add('GUILD_DELETE', require('./handlers/guildDelete'))
    // this.add('GUILD_UPDATE', require('./handlers/guildCreate'))
  }

  add (name, Handler) {
    this.handlers[name] = new Handler(this)
  }

  handle (event, info) {
    if (!this.handlers[event]) return
    this.handlers[event].handle(info)
  }
}

module.exports = WebSocketManager
