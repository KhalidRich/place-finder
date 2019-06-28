const language = require('@google-cloud/language');

class SentimentAnalysisService {
  constructor() {
    this.client = new language.LanguageServiceClient();
  }

  createDocument(reviews) {
    if (Array.isArray(reviews)) {
      return reviews.join(' ');
    } else {
      return reviews;
    }
  }

  async analyzePlace(googlePlaceId, reviews) {
    const document = {
      content: this.createDocument(reviews),
      type: 'PLAIN_TEXT'
    };

    const [result] = await this.client.analyzeSentiment({
      document: document
    });
    const sentiment = result.documentSentiment;

    return {
      score: sentiment.score,
      magnitude: sentiment.magnitude
    };
  }
}

module.exports = SentimentAnalysisService;