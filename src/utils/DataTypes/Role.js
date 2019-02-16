const BaseDataType = require('./BaseDataType')

/**
 * Represents a generic Guild role
 * @extends BaseDataType
 * @type {class}
 */
class Role extends BaseDataType {
  constructor (client, data) {
    super(client, data)
    this.client = client
    this.id = data.id
    this.name = data.name
    this.color = data.color
    this.hoist = data.hoist
    this.position = data.position
    this.permissions = data.permissions
    this.managed = data.managed
    this.mentionable = data.mentionable
  }
}

module.exports = Role
