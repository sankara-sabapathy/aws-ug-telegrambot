import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
export class BotHandlerService {
    constructor() {
    }
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
}