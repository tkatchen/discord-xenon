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
    this.roles = this.parseDataType(Role, data.roles)
    this.user = (data.user) ? new User(this.client, data.user) : null
    this.requireColons = data.require_colons
    this.managed = data.managed
    this.animated = data.animated
  }
}

module.exports = Emoji
