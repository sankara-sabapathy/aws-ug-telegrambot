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
        const botToken = await new BotHandlerService().getSecretValue();
        const bot = new TelegramBotApi(botToken, { polling: false });
        await bot.sendMessage(
            req.body.message.chat.id,
            'Bot under development.',
            {
                reply_markup:
                {
                    inline_keyboard: [
                        [
                            { text: 'Start', callback_data: '/start' }
                        ]
                    ]
                }
            }
        )
    } catch (error) {
        console.log("Error", error);
    } finally {
        // To avoid retries from telegram, always send 200 status.
        res.status(200).json({ "status": "success" });
    }
})
