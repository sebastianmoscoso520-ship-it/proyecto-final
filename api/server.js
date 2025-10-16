import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { conectarDb } from '../src/config/db.js';
import authRoutes from '../src/routes/user.route.js';
import routes from '../src/routes/producto.route.js';
import { verifyToken } from '../src/middleware/auth.js';
import User from '../src/models/user.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta principal que envía login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Rutas opcionales para otras páginas
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/profile.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

// Conectar a la base de datos
conectarDb();

// Rutas públicas
app.use('/api/auth', authRoutes);
app.use('/api/repuestos', routes);

// Ruta protegida de ejemplo
app.get('/api/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error servidor' });
  }
});

// Levantar servidor solo en desarrollo (local)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Servidor local en puerto ${PORT}`));
}

export default app;
