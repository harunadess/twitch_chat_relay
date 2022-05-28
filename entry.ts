import * as tmi from 'tmi.js';
import { logger } from './src';
import { Identity } from './src/types'

const identity = require('../twitch_identity.json') as Identity;

// todo: oauth flow
// todo: manage channels

const client = new tmi.Client({
  options: { debug: true },
  identity,
  channels: [
    'harunadess'
  ]
});

client.on('chat', (channel: string, userState: tmi.ChatUserstate, message: string, self: boolean) => {
  if(self) return;

  logger.info('From channel', channel, 'Message:', message);
  logger.info('tags', userState);
  client.say(channel, `@${userState.username} hello, world`);
});


client.connect().then((value: [string, number]) => {
  logger.info('Successfully connected', value);
}).catch(error => {
  logger.error('Failed to connect:', error);
  process.exit(1);
});
