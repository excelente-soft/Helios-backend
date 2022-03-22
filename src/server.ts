import express from 'express';
import { PORT, VERSION } from '@config';
import authRoute from '@routes/auth.route';
import compression from 'compression';
import { errorMiddleware } from '@middlewares/error.middleware';
import cors from 'cors';
import DB from '@databases';

const app = express();
const path = `/v${VERSION}/api`;

DB.initialize();
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(path, authRoute);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}${path}`);
});
