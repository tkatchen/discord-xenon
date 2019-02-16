const Handler = require('./handler')
class ChannelCreate extends Handler {
  handle (packet) {
    return this.manager.client.emit('channelCreate', packet.d)
  }
}

module.exports = ChannelCreate
