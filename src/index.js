module.exports = {
  Client: require('./client/Client.js')
}

const Client = require('./client/Client.js')
const bot = new Client()
bot.login('token')

bot.on('ready', () => {
  console.log('online!')
})
