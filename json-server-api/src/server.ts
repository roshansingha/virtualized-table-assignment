import jsonServer from 'json-server';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || ['*'];

// Database path
const dbPath = join(__dirname, '../data/db.json');

// Check if database exists
if (!existsSync(dbPath)) {
    console.error('❌ Error: db.json not found!');
    console.error('📝 Run: npm run generate-data');
    process.exit(1);
}

// Create server
const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({
    logger: NODE_ENV === 'development'
});

// CORS configuration
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow all origins if * is specified
        if (allowedOrigins.includes('*')) {
            return callback(null, true);
        }

        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Reject
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply middlewares
server.use(cors(corsOptions));
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom routes
server.get('/health', (_req: any, res: any) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: NODE_ENV,
        port: PORT
    });
});

server.get('/info', (_req: any, res: any) => {
    const db = router.db;
    res.json({
        endpoints: {
            entities: '/entities',
            health: '/health',
            info: '/info'
        },
        totalEntities: db.get('entities').size().value(),
        cors: allowedOrigins.includes('*') ? 'All origins allowed' : `Allowed: ${allowedOrigins.join(', ')}`
    });
});

// Use default router
server.use(router);

// Start server
server.listen(PORT, () => {
    console.log('');
    console.log('🚀 JSON Server is running!');
    console.log('');
    console.log(`📊 API Endpoints:`);
    console.log(`   - Entities: http://localhost:${PORT}/entities`);
    console.log(`   - Health:   http://localhost:${PORT}/health`);
    console.log(`   - Info:     http://localhost:${PORT}/info`);
    console.log('');
    console.log(`🌐 CORS: ${allowedOrigins.includes('*') ? 'All origins allowed' : allowedOrigins.join(', ')}`);
    console.log(`🔧 Environment: ${NODE_ENV}`);
    console.log('');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('👋 SIGINT received, shutting down gracefully...');
    process.exit(0);
});
