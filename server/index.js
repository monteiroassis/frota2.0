import 'dotenv/config';
import express from 'express';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import cors from 'cors';
import apiRoutes from './routes/api.js';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Health Check
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'OK', message: 'Server is running and DB is connected' });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: 'DB Connection failed', error: err.message });
    }
});

// Pass prisma to requests
app.use((req, res, next) => {
    req.prisma = prisma;
    next();
});

// Routes
app.use('/api', apiRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
