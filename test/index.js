const Client = require('../src/client/Client.js')
const bot = new Client()
const config = require('./config.json')
bot.login(config.token)

bot.on('ready', () => {
  console.log('online!')
  console.log(bot.guilds)
})

bot.on('guildCreate', (guild) => {
  //if (guild.id === '430211206859587584') console.log(guild)
  if (guild.id === '430211206859587584') bot.guilds.get('430211206859587584').channels.get('436665603927965706').send('hey')
})

bot.on('error', error => {
  console.error(error)
})
