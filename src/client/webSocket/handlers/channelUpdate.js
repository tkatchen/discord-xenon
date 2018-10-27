const Handler = require('./handler');
class ChannelUpdate extends Handler {
  handle(packet) {
    return this.manager.client.emit('channelUpdate', packet.d.last_pin_timestamp, packet.d.channel_id, packet.d.guild_id);
  }
}

module.exports = ChannelUpdate;
