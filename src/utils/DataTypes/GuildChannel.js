const User = require('./User');
const BaseDataType = require('./BaseDataType');
const Constants = require('../Constants');

/**
 * Represents a generic Guild Channel
 * @extends BaseDataType
 * @type {class}
 */
class GuildChannel extends BaseDataType {
  constructor(client, data) {
    super(client, data);
    this.client = client;
    this.id = data.id;
    this.type = data.type;
    this.guildID = data.guild_id;
    this.position = data.position;
    this.permissionOverwrites = data.permission_overwrites;
    this.name = data.name;
    this.topic = data.topic;
    this.nsfw = data.nsfw;
    this.lastMessageID = data.last_message_id;
    this.bitrate = data.bitrate;
    this.userLimit = data.user_limit;
    this.rateLimitPerUser = data.rate_limit_per_user;
    this.recipients = (data.recipients) ? this.parseUsers(data.recipients) : null;
    this.icon = data.icon;
    this.ownerID = data.owner_id;
    this.applicationID = data.application_id;
    this.parentID = data.parent_id;
    this.lastPinTimestamp = data.last_pin_timestamp;
  }

  parseUsers(users) {
    const result = new Map();
    for (let i = 0; i < users.length; i++) {
      result.set(users[i].id, new User(users[i]));
    }
    return result;
  }

  send(content) {
    if (content.length >= 2000) return console.console.error(new RangeError(Constants.Errors.MESSAGE_TOO_LONG));
    if (content.length <= 0) return console.error(new RangeError(Constants.Errors.EMPTY_MESSAGE));
    this.client.send(`/channels/${this.id}/messages`, {content: content});
  }
}

module.exports = GuildChannel;
