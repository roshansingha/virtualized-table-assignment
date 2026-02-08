# 🚀 Quick Setup Guide

## Step 1: Copy This Project

```bash
# Copy the json-server-api folder to a new location
cp -r json-server-api ~/Desktop/entity-json-server
cd ~/Desktop/entity-json-server
```

## Step 2: Install Dependencies

```bash
npm install
```

This will automatically:
- Install all dependencies
- Generate 1000 mock entities
- Create `data/db.json`

## Step 3: Start Development Server

```bash
npm run dev
```

You should see:
```
🚀 JSON Server is running!

📊 API Endpoints:
   - Entities: http://localhost:8000/entities
   - Health:   http://localhost:8000/health
   - Info:     http://localhost:8000/info

🌐 CORS: All origins allowed
🔧 Environment: development
```

## Step 4: Test the API

Open your browser or use curl:

```bash
# Health check
curl http://localhost:8000/health

# Get all entities
curl http://localhost:8000/entities | jq '. | length'
# Should return: 1000

# Get first entity
curl http://localhost:8000/entities/entity-0001 | jq '.'
```

## Step 5: Update Your Frontend

In your frontend project, update the API URL:

### For Vite/React:

**`.env.local`**:
```env
VITE_API_URL=http://localhost:8000/entities
```

**In your code**:
```typescript
const API_URL = import.meta.env.VITE_API_URL;

async function fetchEntities() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}
```

### For Next.js:

**`.env.local`**:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/entities
```

**In your code**:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

### For Create React App:

**`.env.local`**:
```env
REACT_APP_API_URL=http://localhost:8000/entities
```

**In your code**:
```typescript
const API_URL = process.env.REACT_APP_API_URL;
```

## Step 6: Deploy (Optional)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Render**:

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. Go to https://dashboard.render.com
3. Create Web Service from your repo
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`
6. Add environment variable: `ALLOWED_ORIGINS=*`
7. Deploy!

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Database Not Found

```bash
# Regenerate database
npm run generate-data
```

### CORS Errors

Update `.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

Then restart the server.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run generate-data` | Generate 1000 mock entities |

---

## Next Steps

1. ✅ Server running locally
2. ✅ Frontend fetching from local API
3. ⏭️ Deploy to Render/Railway
4. ⏭️ Update frontend to use deployed URL
5. ⏭️ Update CORS to allow only your frontend

---

**You're all set!** 🎉

For more details, see:
- [README.md](./README.md) - Full documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
