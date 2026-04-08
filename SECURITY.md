# Security Configuration Guide

## Overview
This document explains how secrets and sensitive configuration are managed in the Smart Crops Marketplace application.

---

## Security Implementation

### 1. Environment Variables
All sensitive information is stored in environment variables, NOT in code:
- `JWT_SECRET` - Secret key for JWT token signing
- `MONGO_URI` - MongoDB Atlas connection string

### 2. .env File (Local Development)
**Location:** `/Users/akshatmuchhala/Project/marketplace/.env`

**Contains:**
```env
MONGO_URI=mongodb+srv://Akmuchhala:Akmuchhala3009@cluster0.fps9an5.mongodb.net/marketplace?retryWrites=true&w=majority
JWT_SECRET=smartcrops_prod_secret_key_2024_!@#$%^&*K7mP2sQx9nL8
SPRING_PROFILES_ACTIVE=local
```

**⚠️ IMPORTANT: .env is NEVER committed to Git!**
- Added to `.gitignore`
- Only exists on your local machine
- Each developer/deployment has their own

### 3. Configuration Files

#### `application.properties` (Base - Public)
- No secrets here
- Only non-sensitive config
- Example: `server.port=8080`
- Safe to commit to Git

#### `application-local.yml` (Development)
- Uses `${MONGO_URI}` and `${JWT_SECRET}` placeholders
- Reads actual values from `.env` file
- Used when running locally

#### `application-prod.yml` (Production - Not created yet)
- For future deployment
- Gets secrets from cloud provider's secret manager
- Not checked into Git

---

## How It Works

### Development (Local)

1. **File Structure:**
   ```
   marketplace/
   ├── .env (GITIGNORED - Not in Git)
   ├── .env.example (In Git - template)
   ├── application.properties (In Git)
   ├── application-local.yml (In Git)
   └── src/
   ```

2. **Startup Process:**
   ```
   ./mvnw spring-boot:run
        ↓
   Spring reads .env file (automatically via @Value)
        ↓
   Loads MONGO_URI and JWT_SECRET
        ↓
   JwtUtils.java gets jwt.secret value
   application-local.yml gets mongo.uri value
        ↓
   Application starts with secrets loaded
   ```

3. **No Hardcoded Secrets:**
   - ❌ BEFORE: `private final String SECRET_KEY = "hardcoded_value";`
   - ✅ AFTER: `@Value("${jwt.secret}") private String SECRET_KEY;`

---

## Code Changes Made

### 1. JwtUtils.java
```java
// BEFORE (Unsafe):
private final String SECRET_KEY = "smartcrops_secret_key_change_me_in_production_highly_secret";

// AFTER (Secure):
@Value("${jwt.secret}")
private String SECRET_KEY;
```

### 2. application.properties
```properties
# BEFORE (Unsafe):
spring.data.mongodb.uri=mongodb+srv://Akmuchhala:Akmuchhala3009@cluster0.fps9an5.mongodb.net/...

# AFTER (Secure):
spring.data.mongodb.uri=${MONGO_URI:mongodb+srv://localhost:27017/marketplace}
jwt.secret=${JWT_SECRET:dev_secret_key_for_local_testing_only}
```

---

## How to Use

### First Time Setup
```bash
cd /Users/akshatmuchhala/Project/marketplace

# Copy example file
cp .env.example .env

# Edit .env and add your actual values
# (Your MongoDB credentials and JWT secret)
```

### Running the Application
```bash
# Method 1: Automatic (Spring reads .env)
./mvnw spring-boot:run

# Method 2: Explicit (If Method 1 doesn't work)
export $(cat .env | xargs)
./mvnw spring-boot:run

# Method 3: IntelliJ IDE
# Run → Edit Configurations →
# Add "Spring_Profiles_Active=local" in environment variables
```

---

## Current Secrets

### JWT Secret
- **Key:** `JWT_SECRET`
- **Value:** `smartcrops_prod_secret_key_2024_!@#$%^&*K7mP2sQx9nL8`
- **Length:** 49 characters (strong)
- **Type:** Mix of letters, numbers, special characters
- **Used for:** Signing and validating JWT authentication tokens

### MongoDB Credentials
- **Key:** `MONGO_URI`
- **Value:** From your MongoDB Atlas cluster
- **Format:** `mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/database`
- **Used for:** Connecting to MongoDB database

---

## Deployment (Future)

### When Deploying to Cloud (Heroku, Railway, Render, etc.)

1. **Set Environment Variables in Cloud Dashboard:**
   - Each platform has its own secret management
   - Platform: Settings → Config Vars / Environment Variables
   - Add: `JWT_SECRET` and `MONGO_URI`

2. **Application Will Automatically Use Them:**
   - No code changes needed
   - Spring Boot reads environment variables
   - Works seamlessly

### Example: Heroku Deployment
```bash
# Set secrets in Heroku
heroku config:set JWT_SECRET="your_secret_key"
heroku config:set MONGO_URI="mongodb+srv://..."

# Deploy
git push heroku main

# Application automatically uses these secrets
```

---

## Security Best Practices

✅ **DO:**
- Keep `.env` file locally only
- Use strong JWT secrets (min 32 characters)
- Change JWT secret periodically
- Use different secrets for dev/prod
- Store production secrets in cloud provider's secret manager
- Always commit `.env.example` (without real values)

❌ **DON'T:**
- Never commit `.env` to Git
- Never expose secrets in Git history
- Never hardcode secrets in Java code
- Never share `.env` file
- Never use weak keys
- Never log sensitive information

---

## Troubleshooting

### Issue: "Could not convert type value for key..."
**Cause:** `.env` file not loaded
**Solution:**
```bash
# Check if .env exists
ls -la .env

# If not, create it
cp .env.example .env

# Edit and add values
nano .env
```

### Issue: MongoDB Connection Failed
**Cause:** Wrong credentials in `MONGO_URI`
**Solution:**
1. Go to MongoDB Atlas dashboard
2. Copy connection string exactly
3. Update `MONGO_URI` in `.env`
4. Restart application

### Issue: JWT Token Invalid
**Cause:** JWT_SECRET changed but existing tokens still being used
**Solution:**
- Clear browser localStorage (stores old tokens)
- Log out and log in again

---

## Questions?

For more information about Spring Boot environment variables:
- https://spring.io/guides/gs/spring-boot/
- https://spring.io/guides/tutorials/spring-boot-oauth2/

For MongoDB Atlas connection strings:
- https://docs.mongodb.com/manual/reference/connection-string/
