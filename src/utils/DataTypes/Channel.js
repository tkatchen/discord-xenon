const User = require('./User')
const BaseDataType = require('./BaseDataType')
const constants = require('../Constants')

/**
 * Represents a generic Guild Channel
 * @extends BaseDataType
 * @type {class}
 */
class Channel extends BaseDataType {
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
    const result = new Map()
    for (let i = 0; i < users.length; i++) {
      result.set(users[i].id, new User(users[i]))
    }
    return result
  }

  /**
   * Sends a message to discord
   * @param  {string} content The content to be sent to the channel
   * @throws {RangeError} Can only send messages 0 < message < 2000
   */
  send (content) {
    if (this.type === 2) return console.error(new TypeError("You can't send messages to a Voice Channel"))
    if (content.length > 2000) return console.error(new RangeError(constants.Errors.MESSAGE_TOO_LONG))
    if (content.length <= 0) return console.error(new RangeError(constants.Errors.EMPTY_MESSAGE))
    this.client.manager.send(`/channels/${this.id}/messages`, { content: content })
  }

  /**
   * Gets a group of message
   * @param  {Snowflake} id The message ID
   * @param  {?Number} [limit=50] The number of messages to get, 50 by default
   * @param  {?String} [type='around'] Where to get the messages, possible values are: before, after, or around.
   */
  async getMessages (id, limit = 50, type = 'around') {
    if (!id) return console.error(new Error('Must pass an ID'))
    if (limit <= 0) limit = 50
    if (limit >= 100) limit = 100
    if (type !== 'around' && type !== 'before' && type !== 'after') type = 'around'

    let data = { limit: limit }
    data[type] = id

    let messages = await this.client.manager.get(`/channels/${this.id}/messages`, data)
    // messages = messages.map(msg => new Message(msg))
    return JSON.parse(messages)
  }
}

module.exports = Channel
