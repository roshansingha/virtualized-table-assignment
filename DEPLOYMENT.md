# Deployment Guide

## Overview

This guide covers deploying the Entity Data Table application to production.

## Prerequisites

- Node.js 18+
- pnpm 8+
- Git repository
- Hosting platform account (Vercel, Netlify, etc.)

## Build Process

### Local Build

```bash
# Install dependencies
pnpm install

# Generate data
pnpm generate-data

# Build for production
pnpm build
```

Output will be in the `dist/` directory:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css (5.90 KB)
│   └── index-[hash].js (217.80 KB)
```

### Preview Build

```bash
pnpm preview
```

This starts a local server to preview the production build.

## Deployment Options

### Option 1: Vercel (Recommended)

#### Via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd data-table-app
vercel
```

#### Via Git Integration

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
6. Click "Deploy"

#### Environment Variables

No environment variables needed for the frontend.

### Option 2: Netlify

#### Via CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
pnpm build

# Deploy
netlify deploy --prod --dir=dist
```

#### Via Git Integration

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Configure:
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

#### netlify.toml Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

```bash
# Install gh-pages
pnpm add -D gh-pages

# Add to package.json scripts
"deploy": "pnpm build && gh-pages -d dist"

# Deploy
pnpm deploy
```

Update `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Add this
})
```

### Option 4: AWS S3 + CloudFront

```bash
# Build
pnpm build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Option 5: Docker

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Build and run:

```bash
docker build -t data-table-app .
docker run -p 80:80 data-table-app
```

## JSON Server Deployment

The frontend expects the API at `http://localhost:8000/entities`. For production, you need to deploy the JSON server separately.

### Option 1: Separate Backend Service

Deploy json-server to:
- Heroku
- Railway
- Render
- DigitalOcean App Platform

Example for Railway:

1. Create `server.js`:

```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
```

2. Update `package.json`:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

3. Deploy to Railway

### Option 2: Mock Service Worker (MSW)

For demo purposes, use MSW to mock the API:

```bash
pnpm add msw
```

Create `src/mocks/handlers.ts`:

```typescript
import { http, HttpResponse } from 'msw';
import entities from '../../db.json';

export const handlers = [
  http.get('http://localhost:8000/entities', () => {
    return HttpResponse.json(entities.entities);
  }),
];
```

### Option 3: Replace with Real API

Update `src/hooks/useEntities.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/entities';
```

Add to `.env.production`:

```env
VITE_API_URL=https://your-api.com/entities
```

## Environment Configuration

### Development

```env
# .env.development
VITE_API_URL=http://localhost:8000/entities
```

### Production

```env
# .env.production
VITE_API_URL=https://api.yourdomain.com/entities
```

## Performance Optimization

### 1. Enable Compression

Most hosting platforms enable gzip/brotli automatically.

For custom servers, enable in nginx:

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### 2. Set Cache Headers

```nginx
# Cache static assets for 1 year
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Don't cache HTML
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### 3. CDN Configuration

Use a CDN for static assets:
- Cloudflare
- AWS CloudFront
- Fastly

### 4. Preload Critical Resources

Add to `index.html`:

```html
<link rel="preload" href="/assets/index-[hash].js" as="script">
<link rel="preload" href="/assets/index-[hash].css" as="style">
```

## Monitoring

### Error Tracking

Add Sentry:

```bash
pnpm add @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

### Analytics

Add Google Analytics or Plausible:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

### Performance Monitoring

Use Web Vitals:

```bash
pnpm add web-vitals
```

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Security

### Content Security Policy

Add to `index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';">
```

### HTTPS

Always use HTTPS in production. Most hosting platforms provide free SSL certificates.

### CORS

If API is on different domain, configure CORS:

```javascript
// On API server
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:run
      - run: pnpm build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Rollback Strategy

### Vercel/Netlify

Both platforms keep deployment history. Rollback via dashboard:

1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Manual Rollback

```bash
# Tag releases
git tag v1.0.0
git push origin v1.0.0

# Rollback
git checkout v1.0.0
pnpm build
# Deploy
```

## Health Checks

Create `public/health.json`:

```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

Monitor at: `https://yourdomain.com/health.json`

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules dist
pnpm install
pnpm build
```

### 404 on Refresh

Configure SPA fallback (see platform-specific sections above).

### API Connection Issues

Check:
1. API URL is correct
2. CORS is configured
3. API is deployed and running
4. Network tab in DevTools

### Performance Issues

1. Check bundle size: `pnpm build --analyze`
2. Enable compression
3. Use CDN
4. Optimize images

## Checklist

Before deploying:

- [ ] All tests passing (`pnpm test:run`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Preview works (`pnpm preview`)
- [ ] Environment variables configured
- [ ] API endpoint updated
- [ ] Error tracking setup
- [ ] Analytics configured
- [ ] HTTPS enabled
- [ ] CDN configured (optional)
- [ ] Monitoring setup

## Post-Deployment

1. Test all features in production
2. Check performance metrics
3. Monitor error rates
4. Verify analytics tracking
5. Test on multiple devices/browsers

## Support

For deployment issues:
- Check platform documentation
- Review build logs
- Test locally with `pnpm preview`
- Check browser console for errors

---

**Recommended Platform**: Vercel (easiest setup, best DX)
**Estimated Deploy Time**: 5-10 minutes
**Cost**: Free tier available on all platforms
