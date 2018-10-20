var Handler = require('./handler')
const Guild = require('../../../utils/DataTypes/Guild')
class GuildCreate extends Handler {
  handle (packet) {
    this.manager.client.guilds.set(packet.d.id, new Guild(this.manager.client, packet.d))
    return this.manager.client.emit('guildCreate', new Guild(this.manager.client, packet.d))
  }
}

module.exports = GuildCreate
