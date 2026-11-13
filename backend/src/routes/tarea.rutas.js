import { Router as Enrutador } from 'express';

import * as controladorTarea from '../controllers/tarea.controlador.js';
import {
  reglasTarea,
  reglasIdTarea,
  reglasFiltroTarea,
} from '../middlewares/tarea.validador.js';
import { validarSolicitud } from '../middlewares/validar.solicitud.js';

const enrutador = Enrutador();

enrutador.get('/', reglasFiltroTarea, validarSolicitud, controladorTarea.listar);
enrutador.get('/:id', reglasIdTarea, validarSolicitud, controladorTarea.obtenerPorId);
enrutador.post('/', reglasTarea, validarSolicitud, controladorTarea.crear);
enrutador.put('/:id', reglasIdTarea, reglasTarea, validarSolicitud, controladorTarea.actualizar);
enrutador.patch('/:id', reglasIdTarea, reglasTarea, validarSolicitud, controladorTarea.actualizar);
enrutador.delete('/:id', reglasIdTarea, validarSolicitud, controladorTarea.eliminar);

export default enrutador;
