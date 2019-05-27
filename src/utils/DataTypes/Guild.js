const GuildMember = require('./GuildMember')
const Channel = require('./Channel')
const BaseDataType = require('./BaseDataType')
const Snowflake = require('../Snowflake')
const Emoji = require('./Emoji')
const Role = require('./Role')

/**
 * A generic Discord Guild
 * @extends BaseDataType
 * @type {class}
 */
class Guild extends BaseDataType {
  constructor (client, data) {
    super(client, data)

    /**
     * The client that initiated the guild
     * @type {Client}
     */
    this.client = client

    /**
     * The id of the Guild
     * @type {Snowflake}
    */
    this.id = data.id

    /**
     * The name of the Guild
     * @type {string}
     */
    this.name = data.name

    /**
     * The hash of the Guild icon
     * @type {?string}
     */
    this.icon = data.icon

    /**
     * The hash of the Guild splash
     * @type {?string}
     */
    this.splash = data.splash

    /**
     * The id of the guild owner
     * @type {Snowflake}
     */
    this.ownerID = data.owner_id

    /**
     * The permissions of the user
     * @type {?Permissions}
     */
    this.permissions = data.permissions

    /**
     * The region voice region of the Guild
     * @type {VoiceRegion}
     */
    this.region = data.region

    /**
     * ID of the AFK channel
     * @type {?Snowflake}
     */
    this.afkChannelId = data.afk_channel_id

    /**
     * AFK timeout timer in seconds
     * @type {number}
     */
    this.afkTimeout = data.afk_timeout

    /**
     * Is the Guild embeddable
     * @type {?boolean}
     */
    this.embedEnabled = data.embed_enabled

    /**
     * ID the widget will generate an invite to
     * @type {?Snowflake}
     */
    this.embedChannelID = data.embed_channel_id

    /**
     * The verification level of the current Guild
     * @type {number}
     */
    this.verificationLevel = data.verification_level

    /**
     * Default message notifications level
     * @type {number}
     */
    this.defaultMessageNotifications = data.default_message_notifications

    /**
     * Explicit Content filter level
     * @type {number}
     */
    this.explicitContentFilter = data.explicit_content_filter

    /**
     * A map of the Guild Roles
     * @type {?Map.<Snowflake, Role>}
     */
    this.roles = data.roles ? this.parseDataType(Role, data.roles) : null

    /**
     * A map of the Guild Emojis
     * @type {?Map.<Snowflake, Emoji>}
     */
    this.emojis = data.emojis ? this.parseDataType(Emoji, data.emojis) : null
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
    this.members = data.members ? this.parseDataType(GuildMember, data.members) : null
    this.channels = data.channels ? this.parseDataType(Channel, data.channels) : null
    this.presences = data.presences
  }

  /**
   * Gets the owner of the guild
   * @return {GuildMember} GuildMember of the owner
   */
  get owner () {
    return this.members.get(this.ownerID)
  }

  /**
   * Gets timestamp that guild was created
   * @return {Date} ms representation of the date
   */
  get createdTimestamp () {
    return Snowflake.getTimestamp(this.id)
  }
}

module.exports = Guild
