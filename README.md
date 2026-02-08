# Entity Data Table - Monorepo

A production-quality React application with virtual scrolling and a separate JSON Server API.

## 🏗 Architecture

This is a monorepo containing:
- **Frontend**: React + TypeScript + Vite (Port 5173)
- **API**: JSON Server with CORS support (Port 8000)
- **Shared**: Common utilities and types

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+

### Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Generate mock data**:
   ```bash
   pnpm generate-data
   ```

3. **Start both services**:
   ```bash
   pnpm dev
   ```

   Or start individually:
   ```bash
   # Terminal 1 - API
   pnpm dev:api

   # Terminal 2 - Frontend
   pnpm dev:frontend
   ```

4. **Access the application**:
   - Frontend: http://localhost:5173
   - API: http://localhost:8000/entities
   - Health Check: http://localhost:8000/health

## 📦 Project Structure

```
data-table-monorepo/
├── frontend/          # React application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── api/              # JSON Server API
│   ├── src/          # Server code
│   ├── data/         # Database (db.json)
│   └── package.json  # API dependencies
├── shared/           # Shared utilities
│   ├── scripts/      # Data generation
│   └── types/        # Shared TypeScript types
└── package.json      # Root workspace config
```

## ✨ Features

### Table Functionality
- ✅ Virtual scrolling (1000+ rows)
- ✅ Row selection with persistence
- ✅ Health filter (multi-select dropdown)
- ✅ Real-time search (name OR location)
- ✅ Power sorting (ascending/descending)
- ✅ Full keyboard navigation
- ✅ WCAG AA accessibility

### Technical Highlights
- ✅ Monorepo with pnpm workspaces
- ✅ Independent deployment ready
- ✅ CORS configured
- ✅ Environment variables
- ✅ TypeScript throughout
- ✅ Comprehensive test coverage

## 🧪 Testing

```bash
pnpm test          # Run tests in watch mode
pnpm test:run      # Run tests once
```

## 🏗 Building

```bash
# Build everything
pnpm build

# Build individually
pnpm build:frontend
pnpm build:api
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)

**Vercel**:
1. Connect your GitHub repository
2. Framework Preset: Vite
3. Root Directory: `frontend`
4. Build Command: `pnpm build`
5. Output Directory: `dist`
6. Environment Variables:
   - `VITE_API_URL`: Your API URL (e.g., `https://your-api.onrender.com/entities`)

**Netlify**:
1. Connect repository
2. Base directory: `frontend`
3. Build command: `cd frontend && pnpm install && pnpm build`
4. Publish directory: `frontend/dist`
5. Environment Variables:
   - `VITE_API_URL`: Your API URL

### API (Render/Railway)

**Render**:
1. Create new Web Service
2. Connect your GitHub repository
3. Root Directory: `api`
4. Build Command: `pnpm install && pnpm build && pnpm generate-data`
5. Start Command: `pnpm start`
6. Environment Variables:
   - `PORT`: (auto-set by Render)
   - `ALLOWED_ORIGINS`: Your frontend URL (e.g., `https://your-app.vercel.app`)

**Railway**:
1. Create new project from GitHub
2. Root directory: `api`
3. Build command: `pnpm install && pnpm build && pnpm generate-data`
4. Start command: `pnpm start`
5. Environment Variables:
   - `PORT`: (auto-set by Railway)
   - `ALLOWED_ORIGINS`: Your frontend URL

### Deployment Order
1. Deploy API first → Get API URL
2. Update frontend `VITE_API_URL` with API URL
3. Deploy frontend

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start both frontend and API |
| `pnpm dev:frontend` | Start frontend only |
| `pnpm dev:api` | Start API only |
| `pnpm build` | Build both services |
| `pnpm test` | Run tests |
| `pnpm generate-data` | Generate mock data |
| `pnpm lint` | Lint frontend code |

### Environment Variables

#### Frontend (`frontend/.env.local`)
```env
VITE_API_URL=http://localhost:8000/entities
```

#### API (`api/.env`)
```env
PORT=8000
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173
```

## 📚 Documentation

- [Frontend README](./frontend/README.md) - Frontend-specific documentation
- [API README](./api/README.md) - API-specific documentation
- [Architecture](./ARCHITECTURE.md) - Technical architecture details

## 🛠 Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Zustand (state management)
- @tanstack/react-virtual
- Vitest + React Testing Library

### API
- JSON Server
- CORS
- TypeScript
- Node.js

### Development
- pnpm workspaces
- Concurrently
- TSX

## ⚡ Performance

- Virtual scrolling: Only renders ~30 visible rows out of 1000
- Debounced search: 300ms delay
- Memoized components: Prevents unnecessary re-renders
- Set-based selection: O(1) lookup performance

## ♿ Accessibility

- Full keyboard navigation
- ARIA labels on all interactive elements
- Screen reader compatible
- WCAG AA compliant
- Focus management

## 📝 License

MIT

---

**Built with ❤️ as a production-ready demonstration of React best practices**
