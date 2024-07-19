let app;

function setApp(appInstance) {
  app = appInstance;
}

async function sendSlackNotification(message, channel) {
  if (!app) {
    throw new Error('Slack app has not been initialized');
  }

  try {
    await app.client.chat.postMessage({
      channel: channel,
      ...message
    });
    console.log(`Message sent to channel ${channel}`);
  } catch (error) {
    console.error('Error sending Slack message:', error);
    throw error;
  }
}

module.exports = { sendSlackNotification, setApp };