const Handler = require('./handler');

class GuildCreate extends Handler {
  handle(packet) {
    this.manager.client.manager.setSequence(packet.d.session_id);
    this.manager.client.guildSize = packet.d.guilds.length;
  }
}

module.exports = GuildCreate;
