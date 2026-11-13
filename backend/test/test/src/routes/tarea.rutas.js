import { Router as Enrutador } from 'express';

import * as controladorTarea from '../controllers/tarea.controlador.js';
import { reglasTarea } from '../middlewares/tarea.validador.js';
import { validarSolicitud } from '../middlewares/validar.solicitud.js';

const enrutador = Enrutador();

enrutador.get('/', controladorTarea.listar);
enrutador.get('/:id', controladorTarea.obtenerPorId);
enrutador.post('/', reglasTarea, validarSolicitud, controladorTarea.crear);
enrutador.put('/:id', reglasTarea, validarSolicitud, controladorTarea.actualizar);
enrutador.delete('/:id', controladorTarea.eliminar);

export default enrutador;
