/**
 * A unique ID given to each Discord user representing the timestamp and other information.
 * @typedef {string} Snowflake
 */

var SnowflakeUtil = {
  getTimestamp: (snowflake) => {

    return parseInt(parseInt(snowflake).toString(2).padStart(64, 0).substr(0, 42), 2) + 1420070400000
  },

  getWorkerID: (snowflake) => {
    return parseInt(parseInt(snowflake).toString(2).padStart(64, 0).substr(42, 47), 2)
  },

  getProcessID: (snowflake) => {
    return parseInt(parseInt(snowflake).toString(2).padStart(64, 0).substr(47, 52), 2)
  },

  increment: (snowflake) => {
    return parseInt(parseInt(snowflake).toString(2).padStart(64, 0).substr(52, 64), 2)
  }
}

module.exports = SnowflakeUtil
