import { Router as Enrutador } from 'express';

import * as controladorAutenticacion from '../controllers/autenticacion.controlador.js';
import { reglasInicioSesion, reglasRegistro } from '../middlewares/autenticacion.validador.js';
import { validarSolicitud } from '../middlewares/validar.solicitud.js';

const enrutador = Enrutador();

enrutador.post('/registro', reglasRegistro, validarSolicitud, controladorAutenticacion.registrar);
enrutador.post('/login', reglasInicioSesion, validarSolicitud, controladorAutenticacion.iniciar);
enrutador.post('/logout', controladorAutenticacion.cerrar);

export default enrutador;
