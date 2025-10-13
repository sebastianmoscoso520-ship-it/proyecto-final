// routes/auth.routes.js
import express from 'express';

import { crearUsuraio, registrarse } from '../controller/user.controller.js';

const router = express.Router();

router.post('/register', crearUsuraio);
router.post('/login', registrarse);


export default router;
