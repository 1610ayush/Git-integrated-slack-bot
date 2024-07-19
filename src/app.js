const { App, ExpressReceiver } = require('@slack/bolt');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { handleGitEvent } = require('./eventHandlers');
const { setApp } = require('./slackNotifier');
const { PORT, SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET } = require('./config');

dotenv.config();

const receiver = new ExpressReceiver({ signingSecret: SLACK_SIGNING_SECRET });

receiver.router.use(bodyParser.json());

const app = new App({
  token: SLACK_BOT_TOKEN,
  receiver: receiver
});

setApp(app);

receiver.router.post('/webhook', async (req, res) => {
  console.log('Received webhook. Headers:', req.headers);
  console.log('Received webhook payload:', JSON.stringify(req.body, null, 2));

  const githubEvent = req.headers['x-github-event'];
  
  if (!req.body) {
    console.error('No payload received');
    return res.status(400).send('No payload received');
  }

  try {
    const event = { ...req.body, event_type: githubEvent };
    console.log('Processed event:', JSON.stringify(event, null, 2));
    await handleGitEvent(event);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});

app.error(async (error) => {
  console.error('An error occurred:', error);
});

(async () => {
  try {
    await app.start(PORT);
    console.log(`⚡️ Git integration bot is running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to start app:', error);
  }
})();

module.exports = { app };