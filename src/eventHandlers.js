const { formatPushMessage, formatPullRequestMessage, formatIssueMessage } = require('./messageFormatters');
const { sendSlackNotification } = require('./slackNotifier');
const { REPO_CHANNEL_MAP, DEFAULT_SLACK_CHANNEL } = require('./config');

async function handleGitEvent(event) {
    console.log('Handling git event:', JSON.stringify(event, null, 2));
  
    if (!event || typeof event !== 'object') {
      console.error('Invalid event object received');
      return;
    }
  
    const eventType = event.event_type || event.type || event.action;
  
    if (!eventType) {
      console.error('Unable to determine event type');
      return;
    }
  
    switch (eventType) {
      case 'push':
        await handlePushEvent(event);
        break;
      case 'pull_request':
        await handlePullRequestEvent(event);
        break;
      case 'issues':
        await handleIssueEvent(event);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
  }

async function handlePushEvent(event) {
  const message = formatPushMessage(event);
  await sendSlackNotification(message, getChannelForRepo(event.repository.name));
}

async function handlePullRequestEvent(event) {
  const message = formatPullRequestMessage(event);
  await sendSlackNotification(message, getChannelForRepo(event.repository.name));
}

async function handleIssueEvent(event) {
  const message = formatIssueMessage(event);
  await sendSlackNotification(message, getChannelForRepo(event.repository.name));
}

function getChannelForRepo(repoName) {
  return REPO_CHANNEL_MAP[repoName] || DEFAULT_SLACK_CHANNEL;
}

module.exports = { handleGitEvent };