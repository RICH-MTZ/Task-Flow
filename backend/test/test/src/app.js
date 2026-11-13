// Importaciones de modulos nativos y de terceros
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// Importaciones de la aplicacion (Propias)
import enrutadorAutenticacion from './routes/autenticacion.rutas.js';
import enrutadorTarea from './routes/tarea.rutas.js';
import manejadorErrores from './middlewares/manejador.errores.js';

const aplicacion = express();

aplicacion.use(helmet());

aplicacion.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
}));

aplicacion.use(morgan('dev'));

aplicacion.use(express.json());

const directorioPublico = path.join(process.cwd(), 'public');

aplicacion.use('/assets', express.static(path.join(directorioPublico, 'assets')));

aplicacion.use('/api/v1/auth', enrutadorAutenticacion);
aplicacion.use('/api/v1/tasks', enrutadorTarea);

aplicacion.get('/', (solicitud, respuesta) => {
  respuesta.sendFile('index.html', {
    root: path.join(directorioPublico, 'views'),
    dotfiles: 'deny',
  });
});

aplicacion.get('/api/health', (solicitud, respuesta) => {
  respuesta.json({ status: 'Ok', system: 'TaskFlow' });
});

aplicacion.get('/api/info', (solicitud, respuesta) => {
  const informacion = {
    name : 'TaskFlow',
    version: '1.0.0',
    description: 'TaskFlow, el sistema de seguimiento de tareas y proyectos.',
  };

  respuesta.json(informacion);
});

aplicacion.use((solicitud, respuesta) => {
  const mensaje = {
    mensaje: 'Ruta no encontrada',
    path: solicitud.path,
  };
  respuesta.status(404).json(mensaje);
});

aplicacion.use(manejadorErrores);

export default aplicacion;
