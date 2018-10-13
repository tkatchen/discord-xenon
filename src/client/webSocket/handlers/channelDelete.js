var Handler = require('./handler')
class ChannelDelete extends Handler {
  handle (packet) {
    return this.manager.client.emit('channelDelete', packet.d)
  }
}

module.exports = ChannelDelete
