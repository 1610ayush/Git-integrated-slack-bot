# Git-Slack Integration Bot

This bot integrates GitHub with Slack, sending notifications for various Git events triggered on my project -> indian-upi-apps-logos (NPM package for Indian UPI apps logos so feel free to contribute).

Here is link to join the slack channel to receive notifications - https://gitnotificationstalk.slack.com/archives/C07CU7W8MFZ 

## Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Create a `.env` file based on `.env.example` and fill in your values
4. Run `npm start` to start the bot

## Environment Variables

- `SLACK_BOT_TOKEN`: Your Slack bot's token
- `SLACK_SIGNING_SECRET`: Your Slack app's signing secret
- `DEFAULT_SLACK_CHANNEL`: The default Slack channel ID for notifications
- `INDIAN_UPI_APPS_LOGOS_CHANNEL`: Channel ID for the Indian UPI apps logos repository

## Deployment

This bot is deployed on render.
