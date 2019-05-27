const { Client } = require('../src/index.js')
const bot = new Client()
const config = require('./config.json')

bot.login(config.token)

bot.on('ready', async () => {
  console.log('online!')
  console.log(new Date(bot.guilds.get('430211206859587584').createdTimestamp))
  let messages = await bot.channels.get('457334556060680221').getMessages('526233210338803712', 2, 'before')
  console.log(messages[1].content)
})

bot.on('guildCreate', (guild) => {
  // if (guild.id === '430211206859587584') console.log(guild)
})

bot.on('error', (error) => {
  console.error(error)
})

bot.on('guildBanAdd', (user, guild) => {
  console.log(guild)
  console.log(user.id)
  console.log(guild.id)
})
