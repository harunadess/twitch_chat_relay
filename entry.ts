import * as tmi from 'tmi.js';
import { logger } from './src';
import { Identity, IGenericObjectOfType } from './src/types'

const identity = require('../twitch_identity.json') as Identity;
const commandToken = '!';

// todo: oauth flow
// todo: manage channels

const client = new tmi.Client({
  options: { debug: true },
  identity,
  channels: [
    'harunadess',
    'otherchannel'
  ]
});

const channelForwardMapping = {
  'harunadess': 'otherchannel',
  'otherchannel': 'harunadess'
} as IGenericObjectOfType<string>;

client.on('chat', (channel: string, userState: tmi.ChatUserstate, message: string, self: boolean) => {
  if(self) return;

  switch(message.split(' ')[0]) {
    case `${commandToken}forward`:
      forwardMessage(channel, userState, formatMessage(`${commandToken}forward`, message));
      break;
  }
});

function formatMessage(toRemove: string | RegExp, msg: string): string {
  return msg.replace(toRemove, '').trim();
}

function forwardMessage(channel: string, userState: tmi.ChatUserstate, message: string) {
  const channelKey = channel.slice(1);
  logger.info('userstate: ', userState);
  const msg = `${userState.username} [in: ${channel}] said: ${message}`;

  logger.info('channelKey:', channelKey);
  const forwardingChannel = channelForwardMapping[channel.slice(1)];
  if (forwardingChannel) {
    logger.info('forwarding to ->', forwardingChannel);
    client.say(`#${forwardingChannel}`, msg);
  }
}


client.connect().then((value: [string, number]) => {
  logger.info('Successfully connected', value);
}).catch(error => {
  logger.error('Failed to connect:', error);
  process.exit(1);
});
