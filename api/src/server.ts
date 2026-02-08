import jsonServer from 'json-server';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, '../data/db.json'));
const middlewares = jsonServer.defaults();

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];
const corsOptions = {
    origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200
};

server.use(cors(corsOptions));
server.use(middlewares);

// Health check endpoint
server.get('/health', (_req: any, res: any) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

server.use(router);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log('🚀 JSON Server is running');
    console.log(`📊 API endpoint: http://localhost:${PORT}/entities`);
    console.log(`❤️  Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 CORS enabled for: ${allowedOrigins.join(', ')}`);
});
