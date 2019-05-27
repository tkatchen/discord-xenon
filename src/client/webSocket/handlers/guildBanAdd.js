const Handler = require('./handler')
const Guild = require('../../../utils/DataTypes/Guild')
const User = require('../../../utils/DataTypes/User')
class GuildCreate extends Handler {
  handle (packet) {
    console.log(packet.d)
    this.manager.client.emit('guildBanAdd', new User(this.manager.client, packet.d.user), this.manager.client.guilds.get(packet.d.guild_id))
    this.manager.client.guilds.delete(packet.d.id, new Guild(this.manager.client, packet.d))
  }
}

module.exports = GuildCreate
