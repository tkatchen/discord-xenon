var Handler = require('./handler')
const Guild = require('../../../utils/DataTypes/Guild')
class GuildCreate extends Handler {
  handle (packet) {
    this.manager.client.guilds.set(packet.d.id, packet.d)
    return this.manager.client.emit('guildCreate', new Guild(packet.d))
  }
}

module.exports = GuildCreate
