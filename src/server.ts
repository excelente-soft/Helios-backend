import express from 'express';
import { PORT, VERSION } from '@config';
import authRoute from '@routes/auth.route';
import compression from 'compression';
import DB from '@databases';

const app = express();
const path = `/v${VERSION}/api`;

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(path, authRoute);
DB.sequelize.sync({ force: false });

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}${path}`);
});
