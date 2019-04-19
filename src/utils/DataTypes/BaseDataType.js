/**
 * A generic class for all DataTypes
 * @type {class}
 */
class BaseDataType {
  constructor (client, data) {
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

  parseDataType (Type, data) {
    const result = new Map()
    for (let i = 0; i < data.length; i++) {
      result.set(data[i].id, new Type(this.client, data[i]))
    }
    return result
  }
}

module.exports = BaseDataType
