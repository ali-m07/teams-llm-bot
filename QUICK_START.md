# ⚡ Quick Start - 5 Minutes to LLM in Teams

## The Problem
You need an LLM assistant in Teams, but it's not in your plan. You need something you can:
- ✅ Deploy quickly
- ✅ Change easily (especially via Power Automate)
- ✅ Show to every Teams account

## The Solution
This bot uses **Power Automate** as the connector - meaning you can change the LLM, prompts, and models WITHOUT redeploying code!

## 🚀 Fastest Path (Power Automate)

### Step 1: Create Power Automate Flow (2 minutes)

1. Go to https://make.powerautomate.com
2. **Create** → **Instant cloud flow**
3. Name: `Teams-LLM`
4. Trigger: **"When an HTTP request is received"**
5. Click **"Save"** (this generates your URL - COPY IT!)
6. Add **"+ New step"** → **"HTTP"**
   - Method: `POST`
   - URI: `https://api.openai.com/v1/chat/completions`
   - Headers:
     - `Authorization`: `Bearer YOUR_OPENAI_KEY`
     - `Content-Type`: `application/json`
   - Body:
     ```json
     {
       "model": "gpt-3.5-turbo",
       "messages": [
         {"role": "system", "content": "You are a helpful Teams assistant."},
         {"role": "user", "content": "@{triggerBody()?['message']}"}
       ]
     }
     ```
7. Add **"+ New step"** → **"Parse JSON"**
   - Content: `@{body('HTTP')}`
   - Schema: (see POWER_AUTOMATE_SETUP.md)
8. Add **"+ New step"** → **"Response"**
   - Status: `200`
   - Body: `{"response": "@{body('Parse_JSON')?['choices']?[0]?['message']?['content']}"}`
9. **Save** and **Test**

### Step 2: Register Azure Bot (2 minutes)

1. Go to https://portal.azure.com
2. **Create resource** → Search "Azure Bot"
3. Fill in:
   - Name: `teams-llm-bot`
   - Subscription: Your subscription
   - Resource group: Create new
   - Pricing: F0 (Free)
4. Click **Create**
5. Once created, go to **Configuration**
6. Copy **Microsoft App ID**
7. Click **Manage** → **New client secret**
8. Copy the **Secret Value** (you'll only see it once!)

### Step 3: Configure Bot (1 minute)

```bash
cd teams-llm-bot
cp .env.example .env
```

Edit `.env`:
```
MicrosoftAppId=<paste-app-id>
MicrosoftAppPassword=<paste-secret>
USE_POWER_AUTOMATE=true
POWER_AUTOMATE_URL=<paste-power-automate-url>
```

### Step 4: Deploy Bot

**Option A: Azure App Service (Recommended)**
```bash
# Install Azure CLI if needed
npm install -g azure-cli

# Login
az login

# Deploy
az webapp up --name teams-llm-bot --runtime "NODE:18-lts" --location westus
```

**Option B: Local Testing**
```bash
npm install
npm start

# In another terminal:
ngrok http 3978
# Copy the ngrok URL
```

### Step 5: Update Bot Endpoint

1. Go back to Azure Portal → Your Bot
2. **Configuration** → **Messaging endpoint**
3. Set to: `https://your-bot-url.azurewebsites.net/api/messages`
   (or `https://your-ngrok-url.ngrok.io/api/messages` for local)
4. **Save**

### Step 6: Update Manifest & Install

1. Edit `manifest.json`:
   - Replace `YOUR_APP_ID_HERE` with your App ID
   - Replace `YOUR_BOT_ID_HERE` with your App ID (same)
2. Create icons (or use placeholders):
   - `icon-outline.png` (192x192)
   - `icon-color.png` (192x192)
3. Zip: `manifest.json`, `icon-outline.png`, `icon-color.png`
4. In Teams: **Apps** → **Upload custom app** → Upload zip
5. Install for your organization!

## ✅ Done!

Now every Teams user can:
- Chat with the bot in personal chats
- Use it in team channels
- Use message extension: `@LLM Assistant ask [question]`

## 🔄 Making Changes (Super Easy!)

### Change Model:
1. Open Power Automate flow
2. Edit HTTP action → Change `"model": "gpt-4"`
3. Save → **Done!** (No code deployment)

### Change Prompt:
1. Edit HTTP action → Change system message
2. Save → **Done!**

### Switch LLM Provider:
1. Edit HTTP action → Change URI/headers
2. Save → **Done!**

## 🎯 Why This Works

- **Power Automate** = No-code changes
- **Environment variables** = Quick config changes
- **Teams Bot** = Works everywhere in Teams
- **One deployment** = Available to all Teams accounts

## 🆘 Need Help?

- See `README.md` for detailed docs
- See `POWER_AUTOMATE_SETUP.md` for Power Automate details
- Check Azure Bot Service logs for errors

