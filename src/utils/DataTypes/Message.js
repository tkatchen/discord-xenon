const BaseDataType = require('./BaseDataType.js')
const User = require('./User.js')
const GuildMember = require('./GuildMember.js')
const Role = require('./Role.js')
const Attachment = require('./Attachment.js')

/**
 * Represents a discord message
 * @type class
 */
class Message extends BaseDataType {
  constructor (client, data) {
    super(client, data)
    this.client = client
    this.id = data.id
    this.channelID = data.channel_id
    this.guildID = data.guild_id
    this.author = new User(this.client, data.author)
    this.member = data.member ? new GuildMember(this.client, data.member) : null
    this.content = data.content
    this.timestamp = data.timestamp
    this.editedTimestamp = data.edited_timestamp
    this.tts = data.tts
    this.mentionEveryone = data.mention_everyone
    this.mentions = this.mentions ? this.parseDataType(User, data.mentions) : null
    this.mentionRoles = this.mention_roles ? this.parseDataType(Role, data.mention_roles) : null
    this.attachments = this.attachments ? this.parseDataType(Attachment, data.attachments) : null
  }
}

module.exports = Message
