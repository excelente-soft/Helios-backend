import compression from 'compression';
import cors from 'cors';
import express from 'express';

import { CLIENT_URL, PORT, VERSION } from '@config';
import { DB } from '@databases';
import { errorMiddleware } from '@middlewares/error.middleware';
import { Routes } from '@routes';

const app = express();
const path = `/v${VERSION}/api`;

DB.initialize();
app.disable('x-powered-by');
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(compression({ level: 9, threshold: 420 * 1024 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: 15 * 1024 * 1024 }));
app.use(path, Routes.Auth, Routes.User, Routes.Role);
app.use(path, Routes.Course, Routes.Task, Routes.Lecture, Routes.Test, Routes.Practice);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}${path}`);
});
