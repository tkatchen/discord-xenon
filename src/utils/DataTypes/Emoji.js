const User = require('./User')
const Role = require('./Role')
const BaseDataType = require('./BaseDataType')

/**
 * Represents a Generic Emoji
 * @extends BaseDataType
 * @type {class}
 */
class Emoji extends BaseDataType {
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
    const result = new Map()
    for (let i = 0; i < roles.length; i++) {
      result.set(roles[i].id, new Role(roles[i]))
    }
    return result
  }
}

module.exports = Emoji
