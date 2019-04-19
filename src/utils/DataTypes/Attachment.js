const BaseDataType = require('./BaseDataType')

/**
 * Represents an Attachment
 * @extends BaseDataType
 * @type {class}
 */
class Attachment extends BaseDataType {
  constructor (client, data) {
    super(client, data)
    /**
     * The client who initialized the class
     * @type {Client}
     */
    this.client = client
    /**
     * The ID of the attachment
     * @type {Snowflake}
     */
    this.id = data.id
    /**
     * The name of the file
     * @type {String}
     */
    this.filename = data.filename
    /**
     * The size of the file
     * @type {Number}
     */
    this.size = data.size
    /**
     * The source url of the file
     * @type {String}
     */
    this.url = data.url
    /**
     * The proxied url of the file
     * @type {String}
     */
    this.proxyURL = data.proxy_url
    /**
     * The height of the file (if image)
     * @type {?Number}
     */
    this.height = data.height
    /**
     * The width of the file (if image)
     * @type {?Number}
     */
    this.width = data.width
  }
}

module.exports = Attachment
