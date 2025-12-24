# 🤖 Enterprise LLM Architecture for Microsoft Teams

> **Production-grade AI system architecture**  
> A sophisticated, enterprise-scale LLM integration framework built for Microsoft Teams, featuring advanced middleware patterns, zero-downtime deployment strategies, and production-proven scalability architectures.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Microsoft Teams](https://img.shields.io/badge/Microsoft-Teams-blue.svg)](https://teams.microsoft.com/)
[![Azure](https://img.shields.io/badge/Azure-Cloud-blue.svg)](https://azure.microsoft.com/)

---

## 🎯 Project Overview

This repository contains the **production architecture and implementation** of an enterprise-grade LLM integration system for Microsoft Teams that I've architected and deployed across multiple organizations. The system demonstrates advanced patterns in:

- **Middleware orchestration** using Power Automate as a flexible abstraction layer
- **Zero-downtime deployment strategies** for model updates and provider switching
- **Enterprise-scale architecture** handling production workloads
- **Advanced integration patterns** between Microsoft Bot Framework, Azure services, and LLM providers

This is **not a plug-and-play template**—it's a reference implementation showcasing enterprise architecture patterns, requiring deep understanding of Azure services, Bot Framework, Power Automate, and LLM integration strategies.

### ✨ Technical Highlights

- 🏗️ **Advanced Architecture** - Multi-layer middleware pattern with Power Automate abstraction
- 🔄 **Zero-downtime Operations** - Model/provider switching without service interruption
- 📊 **Production Monitoring** - Comprehensive observability and analytics integration
- 🔐 **Enterprise Security** - Secure credential management, authentication, and audit trails
- ⚡ **Performance Optimization** - Low-latency design patterns and connection pooling
- 🧩 **Modular Design** - Flexible architecture supporting multiple LLM providers and deployment strategies

---

## 💼 About the Architect

**Ali Mansouri** - AI/ML Engineer & Enterprise Solutions Architect

I specialize in designing and implementing production-grade LLM systems and AI architectures for enterprise environments. This Teams integration represents one of several enterprise AI systems I've architected, developed, and deployed for organizations, handling real-world production workloads at scale.

**My Expertise:**
- **Custom LLM Development** - Building and fine-tuning LLM models for specific enterprise use cases
- **Enterprise AI Architecture** - Designing scalable, production-ready AI systems
- **Microsoft Ecosystem Integration** - Deep expertise in Teams, Azure, Power Automate, and Bot Framework
- **Production Deployment** - Systems handling thousands of daily requests with high availability
- **Advanced Integration Patterns** - Complex middleware architectures and service orchestration

**Let's Connect:**
- 📧 **Email**: [ali.mansouri1998@gmail.com](mailto:ali.mansouri1998@gmail.com) | [ali.mansourii@ut.ac.ir](mailto:ali.mansourii@ut.ac.ir)
- 💼 **LinkedIn**: [linkedin.com/in/ali-mansouri-a7984215b](https://www.linkedin.com/in/ali-mansouri-a7984215b)

*Available for enterprise AI architecture consulting, custom LLM development, and complex integration projects.*

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Microsoft Teams Client                     │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ Bot Framework Protocol
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Azure Bot Service (Authentication)              │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│         Teams Bot Application (Node.js/Express)              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Bot Framework SDK                                  │   │
│  │  - Activity Handler                                 │   │
│  │  - Message Processing                              │   │
│  │  - Context Management                              │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Middleware Layer                                    │   │
│  │  - Power Automate Integration                       │   │
│  │  - Direct API Fallback                             │   │
│  │  - Error Handling & Retry Logic                    │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│         Power Automate (Middleware Orchestration)            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Request Transformation                              │   │
│  │  Provider Abstraction                                │   │
│  │  Rate Limiting & Throttling                         │   │
│  │  Logging & Analytics                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ Provider-Agnostic Interface
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              LLM Provider Layer                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ OpenAI   │  │ Azure AI │  │ Custom   │                 │
│  │ API      │  │ Services │  │ Models   │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Decisions

**Why Power Automate as Middleware?**
- **Abstraction Layer**: Decouples bot logic from LLM provider specifics
- **Operational Flexibility**: Model/provider changes without code deployment
- **Built-in Capabilities**: Native integration with Azure services, logging, monitoring
- **Enterprise Features**: Secure parameter management, compliance, audit trails
- **Scalability**: Auto-scaling and load distribution handled by Azure

**Why This Pattern?**
- **Maintainability**: Clear separation of concerns
- **Testability**: Each layer can be tested independently
- **Extensibility**: Easy to add new providers or features
- **Production-Ready**: Handles errors, retries, and edge cases

---

## 🚀 Getting Started

### Prerequisites

This implementation requires expertise in:
- **Microsoft Bot Framework** and Teams development
- **Azure services** (Bot Service, App Service, Key Vault)
- **Power Automate** flow design and HTTP connectors
- **Node.js** and Express.js
- **LLM API integration** patterns
- **Enterprise security** practices

**Technical Requirements:**
- Node.js 16+ 
- Azure subscription with Bot Service access
- Power Automate account (for middleware pattern)
- LLM API credentials (OpenAI, Azure OpenAI, or custom provider)

### Architecture Setup

#### 1. Azure Bot Service Registration

1. Create Azure Bot resource in Azure Portal
2. Configure authentication (Microsoft App ID/Password)
3. Set up messaging endpoint (will be configured after deployment)
4. Note App ID and generate client secret

#### 2. Power Automate Middleware Configuration

The Power Automate layer serves as the abstraction between your bot and LLM providers. This requires:

- **Flow Design**: HTTP-triggered flow with request/response transformation
- **Provider Integration**: HTTP actions configured for your LLM provider
- **Security**: Secure parameter storage for API keys
- **Monitoring**: Logging and analytics actions

See [POWER_AUTOMATE_SETUP.md](./POWER_AUTOMATE_SETUP.md) for detailed architecture patterns.

#### 3. Application Deployment

```bash
# Clone repository
git clone https://github.com/ali-m07/teams-llm-bot.git
cd teams-llm-bot

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Azure Bot credentials and Power Automate endpoint

# Deploy to Azure App Service
az webapp up --name your-bot-name --runtime "NODE:18-lts" --location westus
```

#### 4. Teams Integration

1. Update `manifest.json` with your Bot App ID
2. Create app icons (192x192px)
3. Package manifest and icons as ZIP
4. Upload to Teams Admin Center or distribute via App Catalog

---

## 📁 Codebase Structure

```
teams-llm-bot/
├── manifest.json              # Teams app manifest configuration
├── bot.js                     # Core bot logic with middleware integration
│   ├── LLMBot class           # Bot Framework activity handler
│   ├── Power Automate client  # Middleware communication layer
│   └── Direct API fallback   # Provider abstraction
├── index.js                   # Express server and Bot Framework adapter
├── package.json               # Dependencies and scripts
├── .env.example              # Environment configuration template
├── power-automate-flow.json  # Power Automate flow definition (reference)
├── deploy.sh                 # Deployment automation script
├── README.md                 # This file
├── QUICK_START.md           # Setup guide
└── POWER_AUTOMATE_SETUP.md  # Middleware architecture guide
```

---

## 🎯 Implementation Features

### Core Capabilities

- ✅ **Multi-scope Bot Framework Integration** - Personal, team, and group chat support
- ✅ **Message Extensions** - Teams compose extension for quick access
- ✅ **Activity Handling** - Typing indicators, error recovery, context management
- ✅ **Health Monitoring** - Built-in health check endpoints for observability

### Enterprise Architecture Features

- ✅ **Middleware Abstraction** - Power Automate layer for provider independence
- ✅ **Zero-downtime Updates** - Model/provider switching without service interruption
- ✅ **Provider Flexibility** - Support for multiple LLM providers via abstraction
- ✅ **Production Scalability** - Architecture designed for high-volume workloads
- ✅ **Security Architecture** - Secure credential management, authentication, audit trails
- ✅ **Error Handling** - Comprehensive error recovery and retry patterns
- ✅ **Monitoring Integration** - Built-in observability and analytics hooks

---

## 🔄 Operational Patterns

### Model Updates (Zero-Downtime)

**Via Power Automate Middleware:**
1. Update Power Automate flow HTTP action
2. Modify model parameter in request body
3. Save flow → **Instant update** (no bot code deployment)

**Via Direct API:**
1. Update environment variable `LLM_MODEL`
2. Restart application service
3. **Minimal downtime** (typically < 30 seconds)

### Provider Switching

**Via Power Automate:**
1. Update HTTP action URI and headers
2. Adjust request/response transformation logic
3. Save → **Immediate provider switch**

### Prompt Engineering

**Via Power Automate:**
1. Modify system message in HTTP action body
2. Save → **Instant prompt update**

### Adding Observability

**Via Power Automate:**
1. Add Azure Log Analytics or Application Insights actions
2. Configure logging steps in flow
3. Save → **Enhanced monitoring** without code changes

---

## 🔐 Security Architecture

### Implementation Practices

- ✅ **Credential Management** - Environment variables excluded from version control
- ✅ **Azure Key Vault** - Production secret storage integration
- ✅ **Power Automate Security** - Secure parameters for API keys
- ✅ **Authentication** - Bot Framework authentication and OAuth flows
- ✅ **Rate Limiting** - Built into Power Automate and application layer
- ✅ **Audit Logging** - Comprehensive audit trails for compliance
- ✅ **Network Security** - HTTPS-only communication, certificate validation

### Security Considerations

This architecture implements defense-in-depth principles:
- **Application Layer**: Bot Framework authentication
- **Middleware Layer**: Power Automate secure parameters and authentication
- **Provider Layer**: API key management and request signing
- **Infrastructure Layer**: Azure security features and network isolation

---

## 📊 Production Deployment Architecture

### Azure App Service Deployment

```bash
# Azure CLI deployment
az webapp up --name teams-llm-bot --runtime "NODE:18-lts" --location westus

# Configure application settings
az webapp config appsettings set --name teams-llm-bot --settings \
  MicrosoftAppId="<app-id>" \
  MicrosoftAppPassword="<password>" \
  USE_POWER_AUTOMATE="true" \
  POWER_AUTOMATE_URL="<endpoint-url>" \
  NODE_ENV="production"
```

### Container Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3978
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3978/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
CMD ["node", "index.js"]
```

### Infrastructure Considerations

- **Scaling**: Configure App Service auto-scaling based on metrics
- **Monitoring**: Integrate Application Insights for application telemetry
- **Backup**: Configure automated backups for configuration and state
- **Disaster Recovery**: Multi-region deployment for high availability

---

## 🧪 Development & Testing

### Local Development

```bash
# Install dependencies
npm install

# Run application
npm start

# Health check
curl http://localhost:3978/health

# Teams integration testing (requires ngrok)
ngrok http 3978
# Update Azure Bot messaging endpoint to ngrok URL
```

### Testing Strategy

- **Unit Tests**: Bot logic and middleware communication
- **Integration Tests**: End-to-end flow with Power Automate
- **Load Testing**: Performance under production-like conditions
- **Security Testing**: Authentication and authorization flows

---

## 🐛 Troubleshooting & Operations

### Common Issues

**Bot not responding:**
- Verify Azure Bot Service configuration
- Check application health endpoint: `GET /health`
- Review Application Insights logs
- Verify Power Automate flow status

**Power Automate errors:**
- Check flow run history in Power Automate portal
- Verify secure parameters are configured
- Review HTTP action configuration
- Check API rate limits and quotas

**Teams integration issues:**
- Validate `manifest.json` schema
- Verify bot registration in Azure
- Check app installation in Teams Admin Center
- Review Bot Framework diagnostic logs

### Monitoring & Observability

- **Application Insights**: Application telemetry and performance metrics
- **Power Automate Analytics**: Flow execution history and performance
- **Azure Bot Service Logs**: Bot Framework diagnostic information
- **Custom Logging**: Application-specific logging via Power Automate

---

## 📚 Architecture Documentation

- [QUICK_START.md](./QUICK_START.md) - Setup guide for developers
- [POWER_AUTOMATE_SETUP.md](./POWER_AUTOMATE_SETUP.md) - Middleware architecture patterns
- [Microsoft Bot Framework Docs](https://docs.microsoft.com/en-us/azure/bot-service/)
- [Power Automate Docs](https://docs.microsoft.com/en-us/power-automate/)
- [Azure Bot Service Docs](https://docs.microsoft.com/en-us/azure/bot-service/)

---

## 🤝 Contributing

This repository demonstrates enterprise architecture patterns. Contributions that enhance the architecture, add new patterns, or improve documentation are welcome.

**Areas for Contribution:**
- Additional LLM provider integrations
- Enhanced monitoring and observability patterns
- Security improvements
- Performance optimizations
- Documentation enhancements

---

## 📄 License

MIT License - This architecture and implementation can be used as a reference for enterprise projects.

---

## 💬 Consulting & Collaboration

**Ali Mansouri**  
AI/ML Engineer & Enterprise Solutions Architect

- 📧 **Email**: [ali.mansouri1998@gmail.com](mailto:ali.mansouri1998@gmail.com) | [ali.mansourii@ut.ac.ir](mailto:ali.mansourii@ut.ac.ir)
- 💼 **LinkedIn**: [linkedin.com/in/ali-mansouri-a7984215b](https://www.linkedin.com/in/ali-mansouri-a7984215b)

**Available for:**
- Enterprise AI architecture consulting
- Custom LLM model development and fine-tuning
- Production AI system design and implementation
- Microsoft Teams and Azure integration projects
- Complex middleware architecture design
- Power Automate and Azure services optimization

*Let's architect something exceptional together.* 🚀

---

## ⭐ Recognition

If this architecture has been valuable for your organization or learning:
- ⭐ Star the repository
- 🔗 Share with your professional network
- 💼 Connect on LinkedIn
- 📧 Reach out for architecture consulting or collaboration opportunities

---

**Architected & Implemented by Ali Mansouri**  
*Enterprise AI Architecture | Production LLM Systems | Microsoft Teams Integration | Advanced Middleware Patterns*
