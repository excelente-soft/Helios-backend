import express from 'express';

import { Controllers } from '@controllers';

const router = express.Router();

router.post('/login', Controllers.Auth.login);
router.post('/signup', Controllers.Auth.signup);
router.post('/validate', Controllers.Auth.validate);
router.post('/refresh', Controllers.Auth.refresh);

export default router;

