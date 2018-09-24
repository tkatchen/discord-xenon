exports.Errors = {
  INVALID_CLIENT_TOKEN: 'Invalid token input'
}

exports.Events = {
  10: (client, params, ws) => {
    client.heartbeat(params['d']['heartbeat_interval'])
    var results = {
      'token': client.token,
      'properties': {
        '$os': process.platform,
        '$browser': 'discord-xenon',
        '$device': 'discord-xenon'
      },
      'compress': true
    }
    ws.send(JSON.stringify(results))
  }
}
