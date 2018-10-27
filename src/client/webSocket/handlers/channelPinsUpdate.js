const Handler = require('./handler');
class ChannelPinsUpdate extends Handler {
  handle(packet) {
    console.log(packet);
    return this.manager.client.emit('channelPinsUpdate', packet.d);
  }
}

module.exports = ChannelPinsUpdate;
