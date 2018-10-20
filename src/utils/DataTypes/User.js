const BaseType = require('./BaseType')

module.exports = class User extends BaseType {
  constructor (client, data) {
    super(client, data)
    this.client = client
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
}
