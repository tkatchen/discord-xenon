const User = require('./User')
const Role = require('./Role')
const BaseType = require('./BaseType')

module.exports = class Emoji extends BaseType {
  constructor (client, data) {
    super(client, data)
    this.client = client
    this.id = data.id
    this.name = data.name
    this.roles = this.parseRoles(data.roles)
    this.user = (data.user) ? new User(data.user) : null
    this.requireColons = data.require_colons
    this.managed = data.managed
    this.animated = data.animated
  }

  parseRoles (roles) {
    var result = new Map()
    for (var i = 0; i < roles.length; i++) {
      result.set(roles[i].id, new Role(roles[i]))
    }
    return result
  }
}
