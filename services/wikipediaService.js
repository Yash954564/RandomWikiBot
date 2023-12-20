const axios = require('axios');

async function fetchRandomWikipediaArticle() {
  try {
    const response = await axios.get(process.env.WIKIPEDIA_API_URL, {
      params: {
        action: 'query',
        format: 'json',
        list: 'random',
        rnnamespace: 0, // Filter to main namespace (articles)
        rnlimit: 1, // Get only one random article
      },
    });

    const article = response.data?.query?.random?.[0];
    return article;
  } catch (error) {
    console.error('Error fetching random Wikipedia article:', error.message);
    return null;
  }
}

async function fetchArticleSummary(title) {
  try {
    const response = await axios.get(process.env.WIKIPEDIA_API_URL, {
      params: {
        action: 'query',
        format: 'json',
        prop: 'extracts',
        exintro: true,
        titles: title,
      },
    });

    const pageId = Object.keys(response.data?.query?.pages)[0];
    const summary = response.data?.query?.pages?.[pageId]?.extract;
    return summary;
  } catch (error) {
    console.error('Error fetching Wikipedia article summary:', error.message);
    return null;
  }
}

module.exports = {
  fetchRandomWikipediaArticle,
  fetchArticleSummary,
};
