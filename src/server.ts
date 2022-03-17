import express from 'express';
import { PORT, VERSION } from '@config';
import authRoute from '@routes/auth.route';

const app = express();
const path = `/v${VERSION}/api`;

app.use(path, authRoute);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}${path}`);
});
