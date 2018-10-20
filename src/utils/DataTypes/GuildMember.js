const User = require('./User')
const BaseType = require('./BaseType')

module.exports = class GuildMembers extends BaseType {
  constructor (client, data) {
    super(client, data)
    this.client = client
    this.user = new User(this.client, data.user)
    this.nick = data.nick
    this.roles = data.roles
    this.joinedAt = data.joined_at
    this.deaf = data.deaf
    this.mute = data.mute
  }
}
