/*
   __    __     ______     ______     __   __     __  __     ______     __     ______    
  /\ "-./  \   /\  __ \   /\  __ \   /\ "-.\ \   /\ \_\ \   /\  ___\   /\ \   /\___  \   
  \ \ \-./\ \  \ \ \/\ \  \ \ \/\ \  \ \ \-.  \  \ \  __ \  \ \  __\   \ \ \  \/_/  /__  
   \ \_\ \ \_\  \ \_____\  \ \_____\  \ \_\\"\_\  \ \_\ \_\  \ \_____\  \ \_\   /\_____\ 
    \/_/  \/_/   \/_____/   \/_____/   \/_/ \/_/   \/_/\/_/   \/_____/   \/_/   \/_____/ 
                                                                                       
    
    initial point of entry for the server
    Project initialized: Mar 17, 2022
    
 */
import express from 'express';
import { CLIENT_URL, PORT, VERSION } from '@config';
import authRoutes from '@routes/auth.route';
import userRoutes from '@routes/user.route';
import courseRoutes from '@routes/course.route';
import compression from 'compression';
import { errorMiddleware } from '@middlewares/error.middleware';
import cors from 'cors';
import DB from '@databases';

const app = express();
const path = `/v${VERSION}/api`;

DB.initialize();
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(compression({ level: 9, threshold: 420 * 1024 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: 15 * 1024 * 1024 }));
app.use(path, authRoutes);
app.use(path, userRoutes);
app.use(path, courseRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}${path}`);
});
