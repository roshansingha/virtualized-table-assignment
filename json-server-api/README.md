# Entity JSON Server API

A standalone JSON Server API serving 1000+ mock entities with CORS support. Perfect for frontend development and demos.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate mock data** (automatic on install):
   ```bash
   npm run generate-data
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Access the API**:
   - Entities: http://localhost:8000/entities
   - Health Check: http://localhost:8000/health
   - Info: http://localhost:8000/info

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run generate-data` | Generate 1000 mock entities |

## 🌐 API Endpoints

### GET /entities
Get all entities (1000 items)

**Response**:
```json
[
  {
    "id": "entity-0001",
    "name": "Naruto Uzumaki",
    "location": "Konoha",
    "health": "Healthy",
    "power": 9000
  }
]
```

### GET /entities/:id
Get specific entity

**Example**: `/entities/entity-0001`

### GET /health
Health check endpoint

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-02-08T12:00:00.000Z",
  "environment": "production",
  "port": 8000
}
```

### GET /info
API information

**Response**:
```json
{
  "endpoints": {
    "entities": "/entities",
    "health": "/health",
    "info": "/info"
  },
  "totalEntities": 1000,
  "cors": "All origins allowed"
}
```

### Query Parameters

JSON Server supports filtering, sorting, and pagination:

```bash
# Filter by health
GET /entities?health=Healthy

# Filter by location
GET /entities?location=Konoha

# Sort by power (ascending)
GET /entities?_sort=power&_order=asc

# Sort by power (descending)
GET /entities?_sort=power&_order=desc

# Pagination
GET /entities?_page=1&_limit=10

# Search
GET /entities?q=Naruto

# Multiple filters
GET /entities?location=Konoha&health=Healthy
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
# Server port
PORT=8000

# CORS allowed origins (comma-separated)
ALLOWED_ORIGINS=*

# Node environment
NODE_ENV=development
```

### Production Configuration

For production, set specific origins:

```env
PORT=8000
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-frontend.netlify.app
NODE_ENV=production
```

## 🚀 Deployment

### Deploy to Render

1. **Create Web Service**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configuration**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `PORT`: (auto-set by Render)
     - `ALLOWED_ORIGINS`: Your frontend URL(s)
     - `NODE_ENV`: `production`

3. **Deploy**:
   - Click "Create Web Service"
   - Wait 2-3 minutes
   - Copy your API URL

### Deploy to Railway

1. **Create Project**:
   - Go to [Railway](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"

2. **Configuration**:
   - Railway auto-detects Node.js
   - Add environment variables:
     - `ALLOWED_ORIGINS`: Your frontend URL(s)
     - `NODE_ENV`: `production`

3. **Deploy**:
   - Railway auto-deploys
   - Copy the generated URL

### Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set Environment Variables**:
   ```bash
   vercel env add ALLOWED_ORIGINS
   vercel env add NODE_ENV
   ```

4. **Redeploy**:
   ```bash
   vercel --prod
   ```

## 📊 Data Schema

### Entity

```typescript
interface Entity {
  id: string;           // Format: "entity-0001"
  name: string;         // Unique name
  location: Location;   // 'Konoha' | 'Suna' | 'Kiri' | 'Iwa' | 'Kumo'
  health: Health;       // 'Healthy' | 'Injured' | 'Critical'
  power: number;        // Range: 100-10000
}
```

### Locations
- **Konoha**: Hidden Leaf Village
- **Suna**: Hidden Sand Village
- **Kiri**: Hidden Mist Village
- **Iwa**: Hidden Stone Village
- **Kumo**: Hidden Cloud Village

### Health States
- **Healthy**: Full health
- **Injured**: Moderate damage
- **Critical**: Severe damage

## 🔒 CORS Configuration

The server supports flexible CORS configuration:

### Development (Allow All)
```env
ALLOWED_ORIGINS=*
```

### Production (Specific Origins)
```env
ALLOWED_ORIGINS=https://app.example.com,https://staging.example.com
```

### Multiple Environments
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://your-app.vercel.app
```

## 🧪 Testing

### Using curl

```bash
# Health check
curl http://localhost:8000/health

# Get all entities
curl http://localhost:8000/entities

# Get specific entity
curl http://localhost:8000/entities/entity-0001

# Filter by health
curl "http://localhost:8000/entities?health=Healthy"

# Sort by power
curl "http://localhost:8000/entities?_sort=power&_order=desc"
```

### Using Browser

- All entities: http://localhost:8000/entities
- Health check: http://localhost:8000/health
- API info: http://localhost:8000/info

## 📁 Project Structure

```
entity-json-server/
├── src/
│   ├── server.ts           # Main server file
│   ├── generateData.ts     # Data generation script
│   └── json-server.d.ts    # Type declarations
├── data/
│   └── db.json            # Generated database (gitignored)
├── dist/                  # Build output (gitignored)
├── .env                   # Environment variables (gitignored)
├── .env.example           # Environment template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── Procfile              # Deployment configuration
└── README.md             # This file
```

## 🔧 Customization

### Change Number of Entities

Edit `src/generateData.ts`:

```typescript
// Generate 5000 entities instead of 1000
const entities = generateEntities(5000);
```

### Add New Fields

Edit the `Entity` interface and generation logic in `src/generateData.ts`:

```typescript
interface Entity {
  id: string;
  name: string;
  location: Location;
  health: Health;
  power: number;
  level: number;        // New field
  team: string;         // New field
}
```

### Custom Routes

Add custom routes in `src/server.ts`:

```typescript
server.get('/stats', (_req: any, res: any) => {
  const db = router.db;
  const entities = db.get('entities').value();
  
  res.json({
    total: entities.length,
    byLocation: // ... custom logic
  });
});
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 8000
lsof -ti:8000

# Kill the process
lsof -ti:8000 | xargs kill -9
```

### Database Not Found

```bash
# Regenerate database
npm run generate-data

# Check if file exists
ls -la data/db.json
```

### CORS Errors

1. Check `ALLOWED_ORIGINS` in `.env`
2. Ensure frontend URL is included
3. Restart server after changing `.env`

### Build Errors

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

## 📝 License

MIT

## 🤝 Contributing

This is a standalone API server. Feel free to fork and customize for your needs.

---

**Built for production-ready mock data serving** 🚀
