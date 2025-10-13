// server.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import { conectarDb } from '../src/config/db.js';
import authRoutes from '../src/routes/user.route.js';
import routes from '../src/routes/producto.route.js'
import { verifyToken } from '../src/middleware/auth.js';
import User from '../src/models/user.model.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

//app.use(express.static('public')); //se comenta porq parece q ace fallar a vercel... para usarlo uso la linea siguiente: 
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static('public'));
}
app.get('/', (req, res) => {
  res.redirect('/login.html');
});


// conectar DB
conectarDb();

// rutas públicas
app.use('/api/auth', authRoutes);
app.use('/api/repuestos', routes)//quiero que se conecte a las rutas de repuestos

// ruta protegida de ejemplo
app.get('/api/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error servidor' });
  }
});

app.get('/', (req, res) => res.send('API funcionando'));

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
//lo anterior lo quite porq vercel no lo necesita, En Vercel eso causa que nunca responda (no se usa listen() en serverless).
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Servidor local en puerto ${PORT}`));
}
//Esto hace que:
// En tu PC (modo desarrollo): sí se ejecute app.listen().
// En Vercel (modo producción): no se ejecute, porque NODE_ENV será 'production'.




export default app; // se puso para que funcione vercel y se anulo lo anterior.