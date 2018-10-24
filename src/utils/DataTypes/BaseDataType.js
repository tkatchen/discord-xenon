/**
 * A generic class for all DataTypes
 * @type {class}
 */
class BaseDataType {
  constructor(client, data) {
    /**
     * [The client that initialized the type]
     * @type {Client}
     */
    this.client = client

    /**
     * [Data to create the new DataType]
     * @type {Object}
     */
    this.data = data
  }
}

module.exports = BaseDataType
