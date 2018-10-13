const { User } = require('./User')

class Emoji {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.roles = data.roles
    this.user = new User(data.user)
    this.requireColons = data.require_colons
    this.managed = data.managed
    this.animated = data.animated
  }

}

module.exports = Emoji
