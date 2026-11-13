import { Tarea } from '../../entities/tarea.entidad.js';
import * as repositorioTarea from '../../repositories/tarea.repositorio.js';

export const ejecutar = async datos => {
  const tarea = new Tarea(datos);
  return await repositorioTarea.crear(tarea);
};
