# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Render (Recommended)

**Pros**: Free tier, auto-sleep, easy setup  
**Cons**: Cold starts after 15min inactivity

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: JSON Server API"
   git remote add origin https://github.com/YOUR_USERNAME/entity-json-server.git
   git push -u origin main
   ```

2. **Create Web Service on Render**:
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Select the repository

3. **Configure**:
   - **Name**: `entity-json-server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `ALLOWED_ORIGINS`: `*` (or your frontend URL)
     - `NODE_ENV`: `production`

4. **Deploy**:
   - Click "Create Web Service"
   - Wait 2-3 minutes
   - Copy URL: `https://entity-json-server.onrender.com`

5. **Test**:
   ```bash
   curl https://entity-json-server.onrender.com/health
   curl https://entity-json-server.onrender.com/entities
   ```

---

### Option 2: Railway

**Pros**: No cold starts, generous free tier  
**Cons**: Requires credit card

1. **Push to GitHub** (same as above)

2. **Create Project**:
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Configure**:
   - Railway auto-detects Node.js
   - Add environment variables:
     - `ALLOWED_ORIGINS`: Your frontend URL
     - `NODE_ENV`: `production`

4. **Deploy**:
   - Railway auto-deploys
   - Copy generated URL

---

### Option 3: Vercel

**Pros**: Fast, global CDN  
**Cons**: Serverless (may have cold starts)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Create vercel.json**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "dist/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "dist/server.js"
       }
     ]
   }
   ```

3. **Deploy**:
   ```bash
   npm run build
   vercel
   ```

4. **Set Environment Variables**:
   ```bash
   vercel env add ALLOWED_ORIGINS
   vercel env add NODE_ENV
   ```

5. **Production Deploy**:
   ```bash
   vercel --prod
   ```

---

### Option 4: Heroku

**Pros**: Mature platform, good docs  
**Cons**: No free tier anymore

1. **Install Heroku CLI**:
   ```bash
   brew install heroku/brew/heroku
   ```

2. **Login**:
   ```bash
   heroku login
   ```

3. **Create App**:
   ```bash
   heroku create entity-json-server
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set ALLOWED_ORIGINS=*
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

6. **Open**:
   ```bash
   heroku open
   ```

---

## Post-Deployment

### 1. Update Frontend

In your frontend `.env` file:

```env
# Local development
VITE_API_URL=http://localhost:8000/entities

# Production (update with your deployed URL)
VITE_API_URL=https://entity-json-server.onrender.com/entities
```

### 2. Update CORS

Update `ALLOWED_ORIGINS` on your deployment platform:

```env
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-frontend.netlify.app
```

### 3. Test Endpoints

```bash
# Replace with your deployed URL
API_URL="https://entity-json-server.onrender.com"

# Health check
curl $API_URL/health

# Get entities
curl $API_URL/entities | jq '. | length'

# Filter
curl "$API_URL/entities?health=Healthy" | jq '. | length'

# Sort
curl "$API_URL/entities?_sort=power&_order=desc" | jq '.[0]'
```

---

## Monitoring

### Render

- View logs: Dashboard → Your Service → Logs
- Metrics: Dashboard → Your Service → Metrics
- Auto-deploy: Enabled by default on push

### Railway

- View logs: Project → Deployments → Logs
- Metrics: Project → Metrics
- Auto-deploy: Enabled by default

### Uptime Monitoring

Use a service like:
- **UptimeRobot**: https://uptimerobot.com (free)
- **Pingdom**: https://pingdom.com
- **Better Uptime**: https://betteruptime.com

Ping your `/health` endpoint every 5-10 minutes to prevent cold starts.

---

## Troubleshooting

### Cold Starts (Render)

**Problem**: First request after 15min takes 30+ seconds

**Solution**: Use a cron job to ping `/health` every 10 minutes:

```bash
# Using cron-job.org or similar
GET https://entity-json-server.onrender.com/health
```

### CORS Errors

**Problem**: Frontend can't access API

**Solution**:
1. Check `ALLOWED_ORIGINS` includes your frontend URL
2. Restart the service
3. Clear browser cache

### Build Failures

**Problem**: Deployment fails during build

**Solution**:
1. Check build logs
2. Ensure `npm run build` works locally
3. Verify all dependencies in `package.json`
4. Check Node version matches (18+)

### Database Not Generated

**Problem**: `/entities` returns empty or 404

**Solution**:
1. Ensure `postinstall` script runs: `npm run generate-data`
2. Check if `data/db.json` exists
3. Manually run: `npm run generate-data`

---

## Cost Comparison

| Platform | Free Tier | Paid |
|----------|-----------|------|
| **Render** | 750 hrs/month, auto-sleep | $7/month |
| **Railway** | $5 credit/month | $0.000231/GB-hour |
| **Vercel** | Hobby (serverless) | $20/month |
| **Heroku** | None | $7/month |

**Recommendation**: Start with Render free tier for demos/portfolios.

---

## Security Best Practices

### 1. Environment Variables

Never commit `.env` files:
```bash
# .gitignore
.env
.env.local
.env.*.local
```

### 2. CORS

Use specific origins in production:
```env
# ❌ Don't use in production
ALLOWED_ORIGINS=*

# ✅ Use specific origins
ALLOWED_ORIGINS=https://your-app.com
```

### 3. Rate Limiting

Add rate limiting for production:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

server.use(limiter);
```

### 4. HTTPS Only

Ensure your deployment platform uses HTTPS (all mentioned platforms do by default).

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Trigger Render Deploy
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

Add `RENDER_DEPLOY_HOOK` to GitHub Secrets.

---

**Your API is ready for production!** 🎉
