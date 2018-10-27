var Handler = require('./handler')
const Guild = require('../../../utils/DataTypes/Guild')

class GuildCreate extends Handler {
  async handle (packet) {
    this.manager.client.manager.setSequence(packet.d.session_id)
    this.manager.client.guildSize = packet.d.guilds.length
  }
}

module.exports = GuildCreate
