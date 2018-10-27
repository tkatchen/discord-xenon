const {Client} = require('./src/index.js');
const bot = new Client();
const config = require('./config.json');

bot.login(config.token);

bot.on('ready', () => {
  console.log('online!');
  console.log(bot.channels.size);
  console.log(new Date(bot.guilds.get('430211206859587584').createdTimestamp));
  bot.guilds.get('430211206859587584').channels.get('436665603927965706').send('hey');
});

bot.on('guildCreate', (guild) => {
  // if (guild.id === '430211206859587584') console.log(guild)
});

bot.on('error', (error) => {
  console.error(error);
});
