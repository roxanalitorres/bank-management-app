import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { applySecurityMiddleware } from './middlewares/security';
import authRoutes from './routes/authRoutes';
import forumRoutes from './routes/forumRoutes';
import transferRoutes from './routes/transferRoutes';
import fileRoutes from './routes/fileRoutes';

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/auth', authRoutes);
app.use('/forum', forumRoutes);
app.use('/transfer', transferRoutes);
app.use('/files', fileRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
