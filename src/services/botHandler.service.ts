import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { readFileSync } from "fs";
import path from "path";
export class BotHandlerService {
    constructor() {
    }
    request: any;
    bot: any;
    /**
     * getSecretValue
     */
    public async getSecretValue() {
        try {
            const secretManagerClient = new SecretsManagerClient({ endpoint: 'https://secretsmanager.ap-south-1.amazonaws.com', region: 'ap-south-1' });
            const getSecretValueCommand = new GetSecretValueCommand({ SecretId: 'kuralsecrets' });
            const secretValue = await secretManagerClient.send(getSecretValueCommand);
            if (!secretValue.SecretString) {
                return false;
            }
            const botToken = JSON.parse(secretValue.SecretString)['awsug-bot-key'];
            return botToken;
        } catch (error) {
            console.log("Error while fetching secrets");
            return false;
        }
    }

    public async handleNewRequest(request: any, bot: any) {
        this.request = request;
        this.bot = bot;
        const requestType = this.getRequestType();
        switch (requestType) {
            case 'START':
                await this.sendWelcomeMessage();
                break;
            case 'EVENTS':
                await this.sendEvents();
                break;
            default:
                await this.sendWelcomeMessage();
                break;
        }
    }

    private getRequestType() {
        if (this.request && this.request.message && this.request.message.text === '/start') {
            return 'START';
        }
        if (this.request && this.request.message && this.request.message.text === '/events') {
            return 'EVENTS';
        }
        return undefined;
    }

    private async sendWelcomeMessage() {
        await this.bot.sendMessage(this.request.message.chat.id, readFileSync(path.join(__dirname, '../assets/Welcome.md'), 'utf-8'), { parse_mode: 'MarkdownV2' });
    }

    private async sendEvents() {
        console.log();
        await this.bot.sendMessage(this.request.message.chat.id, readFileSync(path.join(__dirname, '../assets/Events.md'), 'utf-8'), { parse_mode: 'MarkdownV2' });
    }
}