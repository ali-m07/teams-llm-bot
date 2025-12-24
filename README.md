# 🤖 Enterprise-Grade LLM Integration for Microsoft Teams

> **A production-ready, enterprise-scale LLM bot solution for Microsoft Teams**  
> Built with Power Automate integration for zero-downtime updates and seamless scalability

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Microsoft Teams](https://img.shields.io/badge/Microsoft-Teams-blue.svg)](https://teams.microsoft.com/)

---

## 🎯 Overview

This is a **production-tested, enterprise-ready LLM integration** for Microsoft Teams that I've successfully deployed across multiple organizations. The solution leverages Power Automate as a flexible middleware layer, enabling **instant model updates, provider switching, and prompt modifications** without any code deployments.

### ✨ Key Highlights

- 🚀 **Zero-downtime updates** - Change models, prompts, or providers via Power Automate (no code deployment)
- 🏢 **Enterprise-proven** - Successfully deployed in production environments
- 🔄 **Flexible architecture** - Switch between Power Automate and direct API calls
- 📊 **Built-in monitoring** - Power Automate provides comprehensive analytics
- 🔐 **Security-first** - Secure parameter management and authentication
- ⚡ **Lightning-fast** - Optimized for low latency and high throughput

---

## 💼 About the Developer

**Ali Mansouri** - AI/ML Engineer & Enterprise Solutions Architect

I specialize in building production-grade LLM and AI solutions for enterprise environments. This Teams integration is one of several enterprise AI systems I've developed and deployed for companies, handling real-world production workloads.

**What I've Built:**
- Custom LLM models and fine-tuning pipelines
- Enterprise AI integrations for Microsoft Teams, Slack, and other platforms
- Production AI systems handling thousands of daily requests
- Scalable architectures with Power Automate and Azure services

**Let's Connect:**
- 📧 **Email**: [ali.mansouri1998@gmail.com](mailto:ali.mansouri1998@gmail.com) | [ali.mansourii@ut.ac.ir](mailto:ali.mansourii@ut.ac.ir)
- 💼 **LinkedIn**: [linkedin.com/in/ali-mansouri-a7984215b](https://www.linkedin.com/in/ali-mansouri-a7984215b)

*Open to consulting opportunities, enterprise AI projects, and interesting challenges.*

---

## 🏗️ Architecture

```
┌─────────────┐
│  Teams User │
└──────┬──────┘
       │
       ▼
┌─────────────────┐      ┌──────────────────┐      ┌─────────────┐
│  Teams Bot      │─────▶│ Power Automate   │─────▶│  LLM API    │
│  (Node.js)      │      │  (Middleware)    │      │ (OpenAI/etc)│
└─────────────────┘      └──────────────────┘      └─────────────┘
       │                          │
       │                          │
       ▼                          ▼
┌─────────────┐          ┌──────────────┐
│ Azure Bot   │          │ Monitoring & │
│  Service    │          │  Analytics   │
└─────────────┘          └──────────────┘
```

**Why Power Automate?**
- **No-code updates**: Change models, prompts, providers instantly
- **Built-in monitoring**: Track usage, errors, costs
- **Secure secrets**: Managed credential storage
- **Scalability**: Auto-scales with demand
- **Integration**: Easy to add logging, analytics, webhooks

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites

- Node.js 16+ 
- Microsoft Teams account
- Azure Bot Service registration
- OpenAI API key OR Power Automate account

### Option 1: Power Automate (Recommended for Enterprise)

1. **Create Power Automate Flow** (see [POWER_AUTOMATE_SETUP.md](./POWER_AUTOMATE_SETUP.md))
   - Go to [Power Automate](https://make.powerautomate.com)
   - Create "Instant cloud flow" with HTTP trigger
   - Configure OpenAI API call
   - Copy the HTTP POST URL

2. **Configure Bot**
   ```bash
   cp .env.example .env
   # Edit .env:
   USE_POWER_AUTOMATE=true
   POWER_AUTOMATE_URL=<your-power-automate-url>
   MicrosoftAppId=<your-app-id>
   MicrosoftAppPassword=<your-app-password>
   ```

3. **Deploy**
   ```bash
   npm install
   npm start
   ```

4. **Install in Teams**
   - Update `manifest.json` with your Bot ID
   - Zip manifest + icons
   - Upload to Teams → Apps → Upload custom app

### Option 2: Direct API

```bash
cp .env.example .env
# Edit .env:
USE_POWER_AUTOMATE=false
OPENAI_API_KEY=<your-key>
MicrosoftAppId=<your-app-id>
MicrosoftAppPassword=<your-app-password>
```

See [QUICK_START.md](./QUICK_START.md) for detailed setup instructions.

---

## 📁 Project Structure

```
teams-llm-bot/
├── manifest.json              # Teams app manifest
├── bot.js                     # Core bot logic with Power Automate integration
├── index.js                   # Express server and bot initialization
├── package.json               # Dependencies
├── .env.example              # Configuration template
├── power-automate-flow.json  # Power Automate flow definition (import-ready)
├── deploy.sh                 # Automated deployment script
├── README.md                 # This file
├── QUICK_START.md           # 5-minute setup guide
└── POWER_AUTOMATE_SETUP.md  # Detailed Power Automate guide
```

---

## 🎯 Features

### Core Capabilities
- ✅ **Multi-scope support**: Personal chats, team channels, group chats
- ✅ **Message extensions**: Quick access via `@bot ask [question]`
- ✅ **Typing indicators**: Better UX with real-time feedback
- ✅ **Error handling**: Graceful error recovery and user feedback
- ✅ **Health monitoring**: Built-in health check endpoint

### Enterprise Features
- ✅ **Zero-downtime updates**: Change models via Power Automate
- ✅ **Provider flexibility**: Switch LLM providers instantly
- ✅ **Prompt management**: Update system prompts without deployment
- ✅ **Scalability**: Handles high-volume production workloads
- ✅ **Security**: Secure credential management and authentication

---

## 🔄 Making Changes (Why This is Powerful)

### Change LLM Model
**Via Power Automate:**
1. Open Power Automate flow
2. Edit HTTP action → Change `"model": "gpt-4"`
3. Save → **Done!** (No code deployment, instant update)

**Via Direct API:**
1. Edit `.env` → Change `LLM_MODEL=gpt-4`
2. Restart bot

### Switch LLM Provider
**Via Power Automate:**
1. Edit HTTP action → Change URI/headers
2. Save → **Works immediately**

### Modify System Prompt
**Via Power Automate:**
1. Edit HTTP action body → Change system message
2. Save → **Instant update**

### Add Logging/Analytics
**Via Power Automate:**
1. Add new step → Office 365 / Azure Log Analytics
2. Save → **No bot code changes needed**

---

## 🔐 Security Best Practices

- ✅ Never commit `.env` file (already in `.gitignore`)
- ✅ Use Azure Key Vault for production secrets
- ✅ Enable authentication on Power Automate flows
- ✅ Use Power Automate secure parameters for API keys
- ✅ Implement rate limiting in Power Automate
- ✅ Monitor and audit all API calls

---

## 📊 Production Deployment

### Azure App Service Deployment

```bash
# Install Azure CLI
npm install -g azure-cli

# Login
az login

# Deploy
az webapp up --name teams-llm-bot --runtime "NODE:18-lts" --location westus

# Set environment variables
az webapp config appsettings set --name teams-llm-bot --settings \
  MicrosoftAppId="<id>" \
  MicrosoftAppPassword="<password>" \
  USE_POWER_AUTOMATE="true" \
  POWER_AUTOMATE_URL="<url>"
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3978
CMD ["node", "index.js"]
```

---

## 🧪 Testing

```bash
# Install dependencies
npm install

# Run locally
npm start

# Test health endpoint
curl http://localhost:3978/health

# Test with ngrok for Teams integration
ngrok http 3978
```

---

## 🐛 Troubleshooting

**Bot not responding:**
- Check health endpoint: `GET /health`
- Verify environment variables
- Check Azure Bot Service status
- Review Power Automate run history

**Power Automate errors:**
- Verify URL is correct
- Check flow is enabled
- Verify API key in secure parameters
- Review error messages in run history

**Teams integration issues:**
- Verify `manifest.json` is valid
- Check bot registration in Azure
- Ensure app is installed in Teams
- Review Bot Framework logs

---

## 📚 Documentation

- [QUICK_START.md](./QUICK_START.md) - 5-minute setup guide
- [POWER_AUTOMATE_SETUP.md](./POWER_AUTOMATE_SETUP.md) - Detailed Power Automate configuration
- [Microsoft Bot Framework Docs](https://docs.microsoft.com/en-us/azure/bot-service/)
- [Power Automate Docs](https://docs.microsoft.com/en-us/power-automate/)

---

## 🤝 Contributing

This is a production-tested solution, but contributions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Share your deployment experiences

---

## 📄 License

MIT License - feel free to use this in your projects!

---

## 💬 Contact & Consulting

**Ali Mansouri**  
AI/ML Engineer & Enterprise Solutions Architect

- 📧 **Email**: [ali.mansouri1998@gmail.com](mailto:ali.mansouri1998@gmail.com) | [ali.mansourii@ut.ac.ir](mailto:ali.mansourii@ut.ac.ir)
- 💼 **LinkedIn**: [linkedin.com/in/ali-mansouri-a7984215b](https://www.linkedin.com/in/ali-mansouri-a7984215b)

**Available for:**
- Enterprise AI/LLM consulting
- Custom AI model development
- Production AI system architecture
- Microsoft Teams integration projects
- Power Automate and Azure solutions

*Let's build something amazing together!* 🚀

---

## ⭐ Show Your Support

If this solution helped you or your organization, consider:
- ⭐ Starring this repository
- 🔗 Sharing with your network
- 💼 Connecting on LinkedIn
- 📧 Reaching out for consulting opportunities

---

**Built with ❤️ by Ali Mansouri**  
*Enterprise AI Solutions | Production LLM Systems | Microsoft Teams Integration*
