#!/bin/bash

# Quick deployment script for Teams LLM Bot

echo "🚀 Deploying Teams LLM Bot..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Copying .env.example to .env..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your credentials before deploying!"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js 16+ required. Current version: $(node -v)"
    exit 1
fi

# Validate environment variables
echo "🔍 Validating configuration..."
source .env

if [ -z "$MicrosoftAppId" ] || [ "$MicrosoftAppId" == "YOUR_APP_ID_HERE" ]; then
    echo "❌ MicrosoftAppId not set in .env"
    exit 1
fi

if [ -z "$MicrosoftAppPassword" ] || [ "$MicrosoftAppPassword" == "YOUR_APP_PASSWORD_HERE" ]; then
    echo "❌ MicrosoftAppPassword not set in .env"
    exit 1
fi

if [ "$USE_POWER_AUTOMATE" == "true" ]; then
    if [ -z "$POWER_AUTOMATE_URL" ]; then
        echo "❌ POWER_AUTOMATE_URL not set but USE_POWER_AUTOMATE=true"
        exit 1
    fi
    echo "✅ Using Power Automate: $POWER_AUTOMATE_URL"
else
    if [ -z "$OPENAI_API_KEY" ]; then
        echo "❌ OPENAI_API_KEY not set but USE_POWER_AUTOMATE=false"
        exit 1
    fi
    echo "✅ Using direct OpenAI API"
fi

# Test bot locally
echo "🧪 Testing bot startup..."
timeout 5 npm start > /dev/null 2>&1 &
BOT_PID=$!
sleep 2

if ps -p $BOT_PID > /dev/null; then
    echo "✅ Bot started successfully"
    kill $BOT_PID 2>/dev/null
else
    echo "❌ Bot failed to start. Check your configuration."
    exit 1
fi

echo ""
echo "✅ Ready to deploy!"
echo ""
echo "Next steps:"
echo "1. Deploy to Azure App Service or your hosting platform"
echo "2. Set environment variables in your hosting platform"
echo "3. Update manifest.json with your Bot ID"
echo "4. Upload manifest to Teams"
echo ""
echo "For local testing: npm start"

