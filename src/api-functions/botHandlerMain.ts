import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import TelegramBotApi from 'node-telegram-bot-api';
import { BotHandlerService } from 'src/services/botHandler.service';
const app: express.Express = express();
app.use(cors());
app.use(bodyParser.json({ strict: false }));
module.exports.handler = serverless(app);
app.post('/botHandler', async (req, res) => {
    try {
        const botHandlerService = new BotHandlerService();
        const botToken = process.env.BOT_TOKEN ? process.env.BOT_TOKEN : "" ; 
        //await botHandlerService.getSecretValue(); commenting not to pay for secrets manager :-)
        const bot = new TelegramBotApi(botToken, { polling: false });
        await botHandlerService.handleNewRequest(req.body,bot);
    } catch (error) {
        console.log("Error", error);
    } finally {
        // To avoid retries from telegram, always send 200 status.
        res.status(200).json({ "status": "success" });
    }
})

app.post('/setBotCommands', async (req, res) => {
    try {
        const botHandlerService = new BotHandlerService();
        const botToken = await botHandlerService.getSecretValue();
        const bot = new TelegramBotApi(botToken, { polling: false });
        await bot.setMyCommands([
            {
                command: '/events',
                description: 'List of ongoing AWS User group events'
            },
            {
                command: '/list',
                description: 'AWS User groups list in India'
            },
            {
                command: '/resources',
                description: 'Channels for learning'
            },
        ])
    } catch (error) {
        console.log("Error", error);
    } finally {
        // To avoid retries from telegram, always send 200 status.
        res.status(200).json({ "status": "success" });
    }
})