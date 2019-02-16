/**
 * A unique ID given to each Discord user representing the timestamp and other information.
 * @typedef {string} Snowflake
 */

const SnowflakeUtil = {
  getTimestamp: (snowflake) => {
    // First we convert it to a binary representation
    snowflake = parseInt(snowflake).toString(2).padStart(64, 0)
    // Then we add the discord epoch time
    return parseInt(snowflake.substr(0, 42), 2) + 1420070400000
  },

  getWorkerID: (snowflake) => {
    snowflake = parseInt(snowflake).toString(2).padStart(64, 0)
    return parseInt(snowflake.substr(42, 47), 2)
  },

  getProcessID: (snowflake) => {
    snowflake = parseInt(snowflake).toString(2).padStart(64, 0)
    return parseInt(snowflake.substr(47, 52), 2)
  },

  increment: (snowflake) => {
    snowflake = parseInt(snowflake).toString(2).padStart(64, 0)
    return parseInt(snowflake.substr(52, 64), 2)
  }
}

module.exports = SnowflakeUtil
