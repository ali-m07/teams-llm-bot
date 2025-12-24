# Power Automate Setup Guide

This guide shows you how to set up Power Automate as the LLM connector for easy, no-code changes.

## Why Power Automate?

- ✅ Change LLM provider without code deployment
- ✅ Easy to modify prompts and models
- ✅ Built-in secret management
- ✅ Visual flow editor
- ✅ No need to redeploy bot code

## Step-by-Step Setup

### 1. Create Power Automate Flow

1. Go to [Power Automate](https://make.powerautomate.com)
2. Click **"Create"** → **"Instant cloud flow"**
3. Name it: `Teams-LLM-Connector`
4. Choose trigger: **"When an HTTP request is received"**

### 2. Configure HTTP Trigger

In the trigger, you'll see a JSON schema. Use this:

```json
{
    "type": "object",
    "properties": {
        "message": {
            "type": "string",
            "title": "User Message"
        },
        "userId": {
            "type": "string"
        },
        "userName": {
            "type": "string"
        },
        "timestamp": {
            "type": "string"
        }
    }
}
```

Click **"Save"** - this generates your HTTP POST URL. **Copy this URL!**

### 3. Add OpenAI Action

1. Click **"+ New step"**
2. Search for **"HTTP"** action
3. Configure:
   - **Method**: POST
   - **URI**: `https://api.openai.com/v1/chat/completions`
   - **Headers**:
     ```
     Authorization: Bearer YOUR_OPENAI_API_KEY
     Content-Type: application/json
     ```
   - **Body**:
     ```json
     {
         "model": "gpt-3.5-turbo",
         "messages": [
             {
                 "role": "system",
                 "content": "You are a helpful assistant in Microsoft Teams."
             },
             {
                 "role": "user",
                 "content": "@{triggerBody()?['message']}"
             }
         ],
         "temperature": 0.7,
         "max_tokens": 500
     }
     ```

### 4. Parse Response

1. Add **"+ New step"**
2. Search for **"Parse JSON"**
3. **Content**: `@{body('HTTP')}`
4. **Schema**:
   ```json
   {
       "type": "object",
       "properties": {
           "choices": {
               "type": "array",
               "items": {
                   "type": "object",
                   "properties": {
                       "message": {
                           "type": "object",
                           "properties": {
                               "content": {
                                   "type": "string"
                               }
                           }
                       }
                   }
               }
           }
       }
   }
   ```

### 5. Add Response Action

1. Add **"+ New step"**
2. Search for **"Response"**
3. **Status Code**: 200
4. **Body**:
   ```json
   {
       "response": "@{body('Parse_JSON')?['choices']?[0]?['message']?['content']}"
   }
   ```

### 6. Save and Test

1. Click **"Save"**
2. Click **"Test"** → **"Manually"**
3. Use this test payload:
   ```json
   {
       "message": "Hello, how are you?",
       "userId": "test-user",
       "userName": "Test User",
       "timestamp": "2024-01-01T00:00:00Z"
   }
   ```
4. Verify you get a response

### 7. Configure Bot

1. Copy the HTTP POST URL from step 2
2. Add to your `.env` file:
   ```
   USE_POWER_AUTOMATE=true
   POWER_AUTOMATE_URL=<paste-url-here>
   ```

## 🔄 Making Quick Changes

### Change LLM Model

1. Open your Power Automate flow
2. Edit the HTTP action
3. Change `"model": "gpt-3.5-turbo"` to `"model": "gpt-4"` (or any model)
4. Save - **No code deployment needed!**

### Change System Prompt

1. Edit the HTTP action body
2. Change the system message content
3. Save - **Instant update!**

### Switch to Different LLM Provider

1. Edit the HTTP action
2. Change URI to your provider's endpoint
3. Update headers and body format
4. Save - **Works immediately!**

### Add Logging/Analytics

1. Add a new step before Response
2. Add "Office 365 Outlook" → "Send an email" (for logging)
3. Or add "Azure Log Analytics" action
4. Save - **No bot code changes!**

## 🔐 Security Best Practices

1. **Store API Key Securely:**
   - Use Power Automate's secure parameters
   - Go to Flow Settings → Add parameter → Secure string
   - Reference as `@{parameters('OpenAI_API_Key')}`

2. **Add Authentication:**
   - In HTTP trigger, enable authentication
   - Add API key or OAuth validation

3. **Rate Limiting:**
   - Add a "Delay" action if needed
   - Use Power Automate's built-in throttling

## 🎯 Advanced: Multiple Models

Create multiple flows for different use cases:

- `Teams-LLM-Quick` - Fast responses (gpt-3.5-turbo)
- `Teams-LLM-Detailed` - Detailed answers (gpt-4)
- `Teams-LLM-Code` - Code assistance (gpt-4-turbo)

Switch between them by changing `POWER_AUTOMATE_URL` in `.env`!

## 📊 Monitoring

Power Automate provides built-in monitoring:
- View run history
- See success/failure rates
- Monitor API call costs
- Set up alerts

## 💡 Tips

- Use Power Automate's **"Run after"** to handle errors
- Add **"Condition"** actions for different message types
- Use **"Variables"** to store common prompts
- Create **"Child flows"** for reusable logic

## 🐛 Troubleshooting

**Flow not triggering:**
- Check URL is correct
- Verify flow is enabled
- Check authentication settings

**API errors:**
- Verify API key is correct
- Check rate limits
- Review error messages in run history

**Slow responses:**
- Check OpenAI API status
- Consider using faster model
- Add caching if needed

