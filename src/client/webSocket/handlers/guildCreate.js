const Handler = require('./handler')
const Guild = require('../../../utils/DataTypes/Guild')
const Channel = require('../../../utils/DataTypes/Channel')
class GuildCreate extends Handler {
  handle (packet) {
    this.manager.client.guilds.set(packet.d.id, new Guild(this.manager.client, packet.d))
    this.manager.client.emit('guildCreate', new Guild(this.manager.client, packet.d))
    packet.d.channels.map(channel => this.manager.client.channels.set(channel.id, new Channel(this.manager.client, channel)))
    if (this.manager.client.guildSize <= this.manager.client.guilds.size) this.manager.client.emit('ready')
  }
}

module.exports = GuildCreate
