import { BotFrameworkAdapter } from 'botbuilder';
import * as restify from 'restify';
import { EchoBot } from './bot';

let server = restify.createServer();
server.listen(process.env.PORT || process.env.port || 3978, () => {
  console.log(`${server.name} listening on ${server.url}`);
});

const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const echoBot = new EchoBot();

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async context => {
    await echoBot.onTurn(context);
  });
});
