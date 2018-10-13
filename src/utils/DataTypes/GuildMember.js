const { User } = require('./User')

class GuildMembers {
  constructor (data) {
    this.user = new User(data.user)
    this.nick = data.nick
    this.roles = data.roles
    this.joinedAt = data.joined_at
    this.deaf = data.deaf
    this.mute = data.mute
  }
}

module.exports = GuildMembers
