const GuildMember = require('./GuildMember')
const GuildChannel = require('./GuildChannel')
const BaseType = require('./BaseType')
const Emoji = require('./Emoji')

module.exports = class Guild extends BaseType {
  constructor (client, data) {
    super(client, data);
    this.client = client
    this.id = data.id
    this.name = data.name
    this.icon = data.icon
    this.splash = data.splash
    this.owner = data.owner
    this.ownerID = data.owner_id
    this.permissions = data.permissions
    this.region = data.region
    this.afkChannelId = data.afk_channel_id
    this.afkTimeout = data.afk_timeout
    this.embedEnabled = data.embed_enabled
    this.embedChannelID = data.embed_channel_id
    this.verificationLevel = data.verification_level
    this.defaultMessageNotifications = data.default_message_notifications
    this.explicitContentFilter = data.explicit_content_filter
    this.roles = data.roles
    this.emojis = this.parseEmojis(data.emojis)
    this.features = data.features
    this.mfaLevel = data.mfa_level
    this.applicationID = data.application_id
    this.widgetEnabled = data.widget_enabled
    this.widgetChannelID = data.widget_channel_id
    this.systemChannelID = data.system_channel_id
    this.joinedAt = data.joined_at
    this.large = data.large
    this.unavailable = data.unavailable
    this.memberCount = data.member_count
    this.voiceStates = data.voice_states
    this.members = this.parseMembers(data.members)
    this.channels = this.parseChannels(data.channels)
    this.presences = data.presences
  }

  parseMembers (members) {
    var result = new Map()
    for (var i = 0; i < members.length; i++) {
      result.set(members[i].id, new GuildMember(this.client, members[i]))
    }
    return result
  }

  parseChannels (channels) {
    var result = new Map()
    for (var i = 0; i < channels.length; i++) {
      result.set(channels[i].id, new GuildChannel(this.client, channels[i]))
    }
    return result
  }

  parseEmojis (emojis) {
    var result = new Map()
    for (var i = 0; i < emojis.length; i++) {
      result.set(emojis[i].id, new Emoji(this.client, emojis[i]))
    }
    return result
  }

  getChannels () {
    return this.channels
  }
}
