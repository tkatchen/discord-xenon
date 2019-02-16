const BaseDataType = require('./BaseDataType')
const Snowflake = require('../Snowflake')
/**
 * Represents a generic Discord User
 * @extends BaseDataType
 * @type {class}
 */
class User extends BaseDataType {
  constructor (client, data) {
    super(client, data)
    /**
     * The client that created the User
     * @type {Client}
     */
    this.client = client

    /**
     * The id of the user
     * @type {Snowflake}
     */
    this.id = data.id
    this.username = data.username
    this.discriminator = data.discriminator
    this.avatar = data.avatar
    this.bot = data.bot
    this.mfaEnabled = data.mfa_enabled
    this.locale = data.locale
    this.verified = data.verified
    this.email = data.email
  }

  /**
   * The date that the user was created
   * @return {Date}
   */
  get createdTimestamp () {
    return Snowflake.getTimestamp(this.id)
  }
}

module.exports = User
