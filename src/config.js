require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
    SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
    DEFAULT_SLACK_CHANNEL: process.env.DEFAULT_SLACK_CHANNEL,
    REPO_CHANNEL_MAP: {
      'indian-upi-apps-logos': 'C07CU7W8MFZ',
    }
  };