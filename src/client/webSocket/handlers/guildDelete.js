var Handler = require('./handler')
const Guild = require('../../../utils/DataTypes/Guild')
class GuildCreate extends Handler {
  handle (packet) {
    if(!this.manager.client.ready) this.manager.client.guildSize--
    this.manager.client.emit('guildDelete', this.manager.client.guilds.get(packet.d.id))
    this.manager.client.guilds.delete(packet.d.id, new Guild(this.manager.client, packet.d))
  }
}

module.exports = GuildCreate
