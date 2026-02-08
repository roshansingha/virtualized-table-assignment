# Entity Data API

JSON Server API for the Entity Data Table application.

## 🚀 Local Development

### From Root Directory

```bash
# Generate data first
pnpm generate-data

# Start API only
pnpm dev:api

# Or start both API and frontend
pnpm dev
```

### From API Directory

```bash
cd api

# Install dependencies
pnpm install

# Generate data
pnpm generate-data

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🌐 API Endpoints

Base URL: `http://localhost:8000`

### Entities

- `GET /entities` - Get all entities
- `GET /entities/:id` - Get entity by ID
- `POST /entities` - Create new entity
- `PUT /entities/:id` - Update entity
- `PATCH /entities/:id` - Partial update
- `DELETE /entities/:id` - Delete entity

### Health Check

- `GET /health` - Server health status

### Query Parameters

JSON Server supports filtering, sorting, and pagination:

```bash
# Filter by health
GET /entities?health=Healthy

# Sort by power
GET /entities?_sort=power&_order=desc

# Pagination
GET /entities?_page=1&_limit=10

# Search
GET /entities?q=Naruto
```

## 🔧 Environment Variables

Create a `.env` file:

```env
PORT=8000
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173
```

For production:

```env
PORT=8000
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-frontend.netlify.app
```

### Variables

- `PORT`: Server port (default: 8000, auto-set by hosting platforms)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins (use `*` for development)

## 📦 Data Generation

The API uses generated mock data with 1000 unique entities.

```bash
# Generate data (from root)
pnpm generate-data
```

This creates `api/data/db.json` with:
- 1000 unique entities
- Seeded random generation (reproducible)
- Proper schema validation

## 🏗 Building

```bash
pnpm build
```

Output will be in `dist/` directory.

## 🚀 Deployment

### Render (Recommended)

1. **Create Web Service**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configuration**:
   - Name: `data-table-api`
   - Root Directory: `api`
   - Environment: `Node`
   - Build Command: `pnpm install && pnpm build && pnpm generate-data`
   - Start Command: `pnpm start`

3. **Environment Variables**:
   - `PORT`: (auto-set by Render)
   - `ALLOWED_ORIGINS`: Your frontend URL(s)

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment
   - Copy the API URL

### Railway

1. **Create Project**:
   - Go to [Railway](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

2. **Configuration**:
   - Root directory: `api`
   - Build command: `pnpm install && pnpm build && pnpm generate-data`
   - Start command: `pnpm start`

3. **Environment Variables**:
   - `PORT`: (auto-set by Railway)
   - `ALLOWED_ORIGINS`: Your frontend URL(s)

4. **Deploy**:
   - Railway auto-deploys
   - Copy the generated URL

### Heroku

1. **Create App**:
   ```bash
   heroku create your-api-name
   ```

2. **Set Root Directory**:
   ```bash
   heroku config:set PROJECT_PATH=api
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set ALLOWED_ORIGINS=https://your-frontend.vercel.app
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

## 🔒 CORS Configuration

The API includes CORS middleware to allow cross-origin requests.

### Development

```env
ALLOWED_ORIGINS=*
```

### Production

```env
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-frontend.netlify.app
```

## 📊 Database Schema

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

## 🧪 Testing the API

### Using curl

```bash
# Get all entities
curl http://localhost:8000/entities

# Get specific entity
curl http://localhost:8000/entities/entity-0001

# Health check
curl http://localhost:8000/health
```

### Using Browser

- All entities: http://localhost:8000/entities
- Health check: http://localhost:8000/health

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 8000
lsof -ti:8000

# Kill the process
lsof -ti:8000 | xargs kill -9
```

### CORS Errors

1. Check `ALLOWED_ORIGINS` includes your frontend URL
2. Restart the API server after changing `.env`
3. Clear browser cache

### Database Not Found

```bash
# Regenerate data
pnpm generate-data

# Check file exists
ls -la api/data/db.json
```

## 📁 Project Structure

```
api/
├── src/
│   └── server.ts        # Express server with CORS
├── data/
│   └── db.json          # Generated database (gitignored)
├── dist/                # Build output (gitignored)
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── .env                 # Environment variables (gitignored)
├── .env.example         # Environment template
├── Procfile             # Deployment config
└── README.md            # This file
```

## 🔧 Production Improvements

Consider adding:

1. **Rate Limiting**: Prevent abuse
2. **Logging**: Winston or Pino
3. **Monitoring**: Sentry for error tracking
4. **Caching**: Redis for frequently accessed data
5. **Authentication**: JWT tokens if needed
6. **Validation**: Request body validation
7. **Database**: Replace JSON Server with PostgreSQL/MongoDB

## 📚 Learn More

- [JSON Server Documentation](https://github.com/typicode/json-server)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)

---

**Need help?** Check the [main README](../README.md) or [frontend README](../frontend/README.md)
