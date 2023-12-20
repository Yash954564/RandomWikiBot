const express = require('express');
const app = express();
const { Telegraf, Markup } = require('telegraf');
const dotenv = require('dotenv');
dotenv.config();

const { postRandomWikipediaArticle } = require('./controllers/wikiController');

// Create the Telegraf bot instance
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Handle the /start command
bot.start((ctx) => {
  const startMessage = "Hello! I am your Wikipedia bot. Use /randomwiki to get a random Wikipedia article.";
  // Display the available commands as a quick reply keyboard
  ctx.reply(startMessage, Markup.keyboard([['/randomwiki']]).resize());
});

// Handle the /randomwiki command
bot.command('randomwiki', postRandomWikipediaArticle);

// Start the bot
bot.launch();

// Start the Express.js server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
