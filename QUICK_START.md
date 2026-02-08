# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd data-table-app
pnpm install
```

### Step 2: Generate Data
```bash
pnpm generate-data
```
This creates `db.json` with 1000 entities.

### Step 3: Start Servers

**Terminal 1 - JSON Server (Port 8000):**
```bash
pnpm json-server
```

**Terminal 2 - Dev Server (Port 5173):**
```bash
pnpm dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **API**: http://localhost:8000/entities

## ✅ Verify Everything Works

1. Open http://localhost:5173 in your browser
2. You should see a table with 1000 entities
3. Try:
   - Searching for a name (e.g., "Naruto")
   - Filtering by health status
   - Sorting by power
   - Selecting rows
   - Marking rows as viewed

## 🧪 Run Tests

```bash
pnpm test:run
```

Expected: 25/25 tests passing ✅

## 📦 Build for Production

```bash
pnpm build
```

Output will be in `dist/` directory.

## 🔧 Troubleshooting

### Port Already in Use

If port 8000 is in use:
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

If port 5173 is in use:
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### JSON Server Not Starting

Make sure `db.json` exists:
```bash
ls -la db.json
```

If not, regenerate:
```bash
pnpm generate-data
```

### Frontend Shows Error

1. Check JSON server is running on port 8000
2. Check browser console for errors
3. Verify API is accessible: http://localhost:8000/entities

### Tests Failing

```bash
# Clear cache and reinstall
rm -rf node_modules
pnpm install
pnpm test:run
```

## 📚 More Information

- **Full Documentation**: See [README.md](./README.md)
- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🎯 Key Features to Try

1. **Search**: Type in the search bar (searches name OR location)
2. **Filter**: Click the filter icon in Health column
3. **Sort**: Click the chevron in Power column
4. **Select**: Check individual rows or select all
5. **View State**: Select rows and click "Mark as Viewed"
6. **Console**: Open DevTools to see logged IDs

## ⚡ Performance

- Handles 1000+ rows smoothly
- Virtual scrolling (only renders visible rows)
- Debounced search (300ms)
- Optimized with React.memo and useMemo

## ♿ Accessibility

- Full keyboard navigation (Tab, Space, Enter, Escape)
- ARIA labels on all interactive elements
- Screen reader compatible

---

**Need Help?** Check the full [README.md](./README.md) for detailed instructions.
