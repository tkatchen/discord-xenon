module.exports = {
  Client: require('./client/Client.js')
}

const Client = require('./client/Client.js')
const bot = new Client()
bot.login('token')

bot.on('ready', () => {
  console.log('online!')
  console.log(bot.guilds.get('430211206859587584'))
})

bot.on('guildCreate', (guild) => {
  this.bot.guilds.get(guild.id)
})
