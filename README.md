# AWS User Group Telegram Bot

AWS User Group Telegram Bot helps AWS User group members and community to get all event, updates, resources all at on place using a telagram bot. To open the bot click [here.](https://t.me/aws_user_group_bot)

![test](https://user-images.githubusercontent.com/50690238/199529807-94d4e3c9-b336-492e-98d7-4a9b0882198e.png)

## Architecture

This project is developed using **Serverless Framework** and Deployed using **AWS services**. Below are the sequence of events that follow:
- User interacts with the bot by sending any one of the available commands.
- Telegram call the **webhook** which is configured for the bot.
- Webhook url is a simple REST API **AWS Apigateway** endpoint.
- A **lambda function** is invoked for the request.
- Lambda function get the bot token from **AWS Secrets Manager**.
- User requested information is parsed from the request body.
- An response is sent back to the particular chat id using **Telagram Bot API**
- All logs are captured in **AWS Cloudwatch** service.

## Technology, Framework, Language and other services used

- Serverless Framework
- Telegram Bot API
- AWS APIGateway
- AWS Lambda
- AWS Cloudwatch
- AWS SecretsManager
- AWS CloudFormation
- Github Actions
- TypeScript
- Express 

## Usecase, solution, availability & scalability

One place to know about community actvities. Solves the problem statement of scattered information about AWS User Groups. Since we are using AWS serverless technology, the service is highly available, cost effective and scalable.

## Future Enhancement

Plan is use **AWS DynamoDB** to **register** for various **AWS UserGroup Events** such as hackathon, live webinars, tech talks, community day etc.
