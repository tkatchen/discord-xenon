const User = require('./User');
const BaseDataType = require('./BaseDataType');

/**
 * Represents a generic GuildMember
 * @type {class}
 * @extends BaseDataType
 */
class GuildMember extends BaseDataType {
  constructor(client, data) {
    super(client, data);
    this.client = client;
    this.user = new User(this.client, data.user);
    this.nick = data.nick;
    this.roles = data.roles;
    this.joinedAt = data.joined_at;
    this.deaf = data.deaf;
    this.mute = data.mute;
  }
}

module.exports = GuildMember;
