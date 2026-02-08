# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Generate Data
```bash
pnpm generate-data
```

### Step 3: Start Development
```bash
pnpm dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **API**: http://localhost:8000/entities
- **Health Check**: http://localhost:8000/health

## ✅ Verify Everything Works

1. Open http://localhost:5173 in your browser
2. You should see a table with 1000 entities
3. Try:
   - Searching for a name (e.g., "Naruto")
   - Filtering by health status
   - Sorting by power
   - Selecting rows
   - Clicking Submit button (check console)

## 🧪 Run Tests

```bash
pnpm test:run
```

Expected: **27/27 tests passing** ✅

## 📦 Build for Production

```bash
pnpm build
```

## 🔧 Individual Commands

### Start Services Separately

```bash
# Terminal 1 - API only
pnpm dev:api

# Terminal 2 - Frontend only
pnpm dev:frontend
```

### Build Separately

```bash
pnpm build:api
pnpm build:frontend
```

## 🐛 Troubleshooting

### Port Already in Use

**Port 8000 (API)**:
```bash
lsof -ti:8000 | xargs kill -9
```

**Port 5173 (Frontend)**:
```bash
lsof -ti:5173 | xargs kill -9
```

### Missing db.json

```bash
pnpm generate-data
```

### Frontend Shows Error

1. Check API is running: `pnpm dev:api`
2. Check API URL in `frontend/.env.local`
3. Verify: http://localhost:8000/entities

### Tests Failing

```bash
# Clear cache and reinstall
rm -rf node_modules frontend/node_modules api/node_modules shared/node_modules
pnpm install
pnpm test:run
```

## 📚 More Information

- **Full Documentation**: See [README.md](./README.md)
- **Frontend Docs**: See [frontend/README.md](./frontend/README.md)
- **API Docs**: See [api/README.md](./api/README.md)
- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🚀 Deployment

See [README.md](./README.md#-deployment) for deployment instructions.

---

**Need Help?** Check the main [README.md](./README.md) for detailed instructions.
