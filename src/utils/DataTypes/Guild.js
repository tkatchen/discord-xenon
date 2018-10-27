const GuildMember = require('./GuildMember');
const GuildChannel = require('./GuildChannel');
const BaseDataType = require('./BaseDataType');
const Snowflake = require('../Snowflake');
const Emoji = require('./Emoji');
const Role = require('./Role');

/**
 * A generic Discord Guild
 * @extends BaseDataType
 * @type {class}
 */
class Guild extends BaseDataType {
  constructor(client, data) {
    super(client, data);

    /**
     * The client that initiated the guild
     * @type {Client}
     */
    this.client = client;

    /**
     * The id of the Guild
     * @type {Snowflake}
    */
    this.id = data.id;

    /**
     * The name of the Guild
     * @type {string}
     */
    this.name = data.name;

    /**
     * The hash of the Guild icon
     * @type {?string}
     */
    this.icon = data.icon;

    /**
     * The hash of the Guild splash
     * @type {?string}
     */
    this.splash = data.splash;

    /**
     * The id of the guild owner
     * @type {Snowflake}
     */
    this.ownerID = data.owner_id;

    /**
     * The permissions of the user
     * @type {?Permissions}
     */
    this.permissions = data.permissions;

    /**
     * The region voice region of the Guild
     * @type {VoiceRegion}
     */
    this.region = data.region;

    /**
     * ID of the AFK channel
     * @type {?Snowflake}
     */
    this.afkChannelId = data.afk_channel_id;

    /**
     * AFK timeout timer in seconds
     * @type {integer}
     */
    this.afkTimeout = data.afk_timeout;

    /**
     * Is the Guild embeddable
     * @type {?boolean}
     */
    this.embedEnabled = data.embed_enabled;

    /**
     * ID the widget will generate an invite to
     * @type {?Snowflake}
     */
    this.embedChannelID = data.embed_channel_id;

    /**
     * The verification level of the current Guild
     * @type {integer}
     */
    this.verificationLevel = data.verification_level;

    /**
     * Default message notifications level
     * @type {integer}
     */
    this.defaultMessageNotifications = data.default_message_notifications;

    /**
     * Explicit Content filter level
     * @type {integer}
     */
    this.explicitContentFilter = data.explicit_content_filter;

    /**
     * A map of the Guild Roles
     * @type {Map.<Snowflake, Role>}
     */
    this.roles = this.parseRoles(data.roles);

    /**
     * A map of the Guild Emojis
     * @type {Map.<Snowflake, Emoji>}
     */
    this.emojis = this.parseEmojis(data.emojis);
    this.features = data.features;
    this.mfaLevel = data.mfa_level;
    this.applicationID = data.application_id;
    this.widgetEnabled = data.widget_enabled;
    this.widgetChannelID = data.widget_channel_id;
    this.systemChannelID = data.system_channel_id;
    this.joinedAt = data.joined_at;
    this.large = data.large;
    this.unavailable = data.unavailable;
    this.memberCount = data.member_count;
    this.voiceStates = data.voice_states;
    this.members = this.parseMembers(data.members);
    this.channels = this.parseChannels(data.channels);
    this.presences = data.presences;
  }

  parseMembers(members) {
    const result = new Map();
    for (let i = 0; i < members.length; i++) {
      result.set(members[i].id, new GuildMember(this.client, members[i]));
    }
    return result;
  }

  parseChannels(channels) {
    const result = new Map();
    for (let i = 0; i < channels.length; i++) {
      result.set(channels[i].id, new GuildChannel(this.client, channels[i]));
      this.client.channels.set(channels[i].id, new GuildChannel(this.client, channels[i]));
    }
    return result;
  }

  parseEmojis(emojis) {
    const result = new Map();
    for (let i = 0; i < emojis.length; i++) {
      result.set(emojis[i].id, new Emoji(this.client, emojis[i]));
    }
    return result;
  }

  parseRoles(roles) {
    const result = new Map();
    for (let i = 0; i < roles.length; i++) {
      result.set(roles[i].id, new Role(this.client, roles[i]));
    }
    return result;
  }

  /**
   * The owner of the guild
   * @type {?GuildMember}
   */
  get owner() {
    return this.members.get(this.ownerID);
  }

  get createdTimestamp() {
    return Snowflake.getTimestamp(this.id);
  }
}

module.exports = Guild;
