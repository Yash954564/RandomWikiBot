const { fetchRandomWikipediaArticle, fetchArticleSummary } = require('../services/wikipediaService');
const { Telegraf } = require('telegraf');
const { htmlToText } = require('html-to-text');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

async function postRandomWikipediaArticle(ctx) {
  try {
    const article = await fetchRandomWikipediaArticle();
    if (!article) {
      ctx.reply('Sorry, there was an error fetching the random Wikipedia article.');
      return;
    }

    const summary = await fetchArticleSummary(article.title);
    if (!summary) {
      ctx.reply('Sorry, there was an error fetching the article summary.');
      return;
    }

    // Sanitize the summary to remove HTML tags
    const sanitizedSummary = htmlToText(summary, { wordwrap: 120 });

    const articleUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`;
    const message = `*${article.title}*\n\n${sanitizedSummary}\n\n[Read More](${articleUrl})`;
    ctx.replyWithMarkdown(message);
  } catch (error) {
    console.error('Error posting random Wikipedia article:', error.message);
    ctx.reply('Oops! Something went wrong.');
  }
}

module.exports = {
  postRandomWikipediaArticle, // Make sure it's exported correctly
};
