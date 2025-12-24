const { TeamsActivityHandler, MessageFactory } = require('botbuilder');
const axios = require('axios');

class LLMBot extends TeamsActivityHandler {
    constructor() {
        super();
        
        // Configuration - Easy to change
        this.config = {
            powerAutomateUrl: process.env.POWER_AUTOMATE_URL || '',
            openaiApiKey: process.env.OPENAI_API_KEY || '',
            openaiEndpoint: process.env.OPENAI_ENDPOINT || 'https://api.openai.com/v1/chat/completions',
            model: process.env.LLM_MODEL || 'gpt-3.5-turbo',
            usePowerAutomate: process.env.USE_POWER_AUTOMATE === 'true'
        };
    }

    async onMessageActivity(context) {
        const userMessage = context.activity.text.trim();
        
        // Ignore bot's own messages
        if (userMessage.startsWith('/')) {
            return;
        }

        // Send typing indicator
        await context.sendActivity({ type: 'typing' });

        try {
            let response;
            
            if (this.config.usePowerAutomate && this.config.powerAutomateUrl) {
                // Use Power Automate for LLM processing
                response = await this.callPowerAutomate(userMessage, context);
            } else if (this.config.openaiApiKey) {
                // Direct OpenAI API call
                response = await this.callOpenAI(userMessage);
            } else {
                response = "LLM service not configured. Please set POWER_AUTOMATE_URL or OPENAI_API_KEY.";
            }

            await context.sendActivity(MessageFactory.text(response));
        } catch (error) {
            console.error('Error processing message:', error);
            await context.sendActivity(
                MessageFactory.text(`Sorry, I encountered an error: ${error.message}`)
            );
        }
    }

    async callPowerAutomate(message, context) {
        try {
            const response = await axios.post(
                this.config.powerAutomateUrl,
                {
                    message: message,
                    userId: context.activity.from.id,
                    userName: context.activity.from.name,
                    timestamp: new Date().toISOString()
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                }
            );

            return response.data.response || response.data.text || 'No response received';
        } catch (error) {
            throw new Error(`Power Automate error: ${error.message}`);
        }
    }

    async callOpenAI(message) {
        try {
            const response = await axios.post(
                this.config.openaiEndpoint,
                {
                    model: this.config.model,
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant in Microsoft Teams.'
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.config.openaiApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                }
            );

            return response.data.choices[0].message.content;
        } catch (error) {
            throw new Error(`OpenAI API error: ${error.message}`);
        }
    }

    async onMembersAddedActivity(membersAdded, turnContext) {
        for (const member of membersAdded) {
            if (member.id !== turnContext.activity.recipient.id) {
                await turnContext.sendActivity(
                    MessageFactory.text('Hello! I\'m your LLM assistant. Just type your question and I\'ll help you!')
                );
            }
        }
    }
}

module.exports.LLMBot = LLMBot;

