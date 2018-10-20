const User = require('./User')
const Constants = require('../Constants')
const BaseType = require('./BaseType')
const https = require('https')

module.exports = class GuildChannel extends BaseType {
  constructor (client, data) {
    super(client, data)
    this.client = client
    this.id = data.id
    this.type = data.type
    this.guildID = data.guild_id
    this.position = data.position
    this.permissionOverwrites = data.permission_overwrites
    this.name = data.name
    this.topic = data.topic
    this.nsfw = data.nsfw
    this.lastMessageID = data.last_message_id
    this.bitrate = data.bitrate
    this.userLimit = data.user_limit
    this.rateLimitPerUser = data.rate_limit_per_user
    this.recipients = (data.recipients) ? this.parseUsers(data.recipients) : null
    this.icon = data.icon
    this.ownerID = data.owner_id
    this.applicationID = data.application_id
    this.parentID = data.parent_id
    this.lastPinTimestamp = data.last_pin_timestamp
  }

  parseUsers (users) {
    var result = new Map()
    for (var i = 0; i < users.length; i++) {
      result.set(users[i].id, new User(users[i]))
    }
    return result
  }

  send (content) {
    this.client.send(`/channels/${this.id}/messages`, {content: 'hey'})
  }
}
