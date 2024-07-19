function formatPushMessage(event) {
    return {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*New Push to ${event.repository.name}*\n*Branch:* ${event.ref}\n*Pusher:* ${event.pusher.name}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Commits:*\n${event.commits.map(commit => `• ${commit.message} (${commit.id.substring(0,7)})`).join('\n')}`
          }
        }
      ]
    };
  }
  
  function formatPullRequestMessage(event) {
    return {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*New Pull Request in ${event.repository.name}*\n*Title:* ${event.pull_request.title}\n*Author:* ${event.pull_request.user.login}\n*URL:* ${event.pull_request.html_url}`
          }
        }
      ]
    };
  }
  
  function formatIssueMessage(event) {
    return {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*New Issue in ${event.repository.name}*\n*Title:* ${event.issue.title}\n*Author:* ${event.issue.user.login}\n*URL:* ${event.issue.html_url}`
          }
        }
      ]
    };
  }
  
  module.exports = { formatPushMessage, formatPullRequestMessage, formatIssueMessage };