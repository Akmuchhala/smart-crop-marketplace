#!/bin/bash

# Smart Crops Marketplace - Startup Script
# This script sets up environment variables from .env file and starts the application

set -e  # Exit on error

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "=========================================="
echo "Smart Crops Marketplace"
echo "=========================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ ERROR: .env file not found!"
    echo ""
    echo "Please create a .env file in the project root:"
    echo "  cp .env.example .env"
    echo "  nano .env  # Add your actual credentials"
    echo ""
    exit 1
fi

# Load environment variables from .env file
echo "📝 Loading environment variables from .env..."
export $(cat .env | grep -v '^#' | xargs)

echo "✅ Environment variables loaded"
echo ""

# Check if MONGO_URI is set
if [ -z "$MONGO_URI" ]; then
    echo "❌ ERROR: MONGO_URI not set in .env file"
    exit 1
fi

# Check if JWT_SECRET is set
if [ -z "$JWT_SECRET" ]; then
    echo "❌ ERROR: JWT_SECRET not set in .env file"
    exit 1
fi

echo "Starting Spring Boot application..."
echo "📱 Application will run on: http://localhost:8080"
echo "🛑 Press Ctrl+C to stop"
echo ""

# Start the application
./mvnw spring-boot:run
