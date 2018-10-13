exports.Errors = {
  INVALID_CLIENT_TOKEN: 'Invalid token input'
}

exports.OPCodes = {
  0: 'dispatch',
  1: 'heartbeat',
  2: 'identify',
  3: 'statusUpdate',
  4: 'voiceStateUpdate',
  6: 'resume',
  7: 'reconnect',
  8: 'requestGuildMember',
  9: 'invalidSession',
  10: 'hello',
  11: 'heartbeatAck'
}

exports.GatewayClose = {
  4000: 'unknownError',
  4001: 'unknownOpcode',
  4002: 'decodeError',
  4003: 'notAuthenticated',
  4004: 'authenticationFailed',
  4005: 'alreadyAuthenticated',
  4007: 'invalidSeq',
  4008: 'rateLimited',
  4009: 'sessionTimeout',
  4010: 'invalidShard',
  4011: 'shardingRequired'
}
