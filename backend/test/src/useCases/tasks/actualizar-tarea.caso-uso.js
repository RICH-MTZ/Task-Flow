import { Tarea } from '../../entities/tarea.entidad.js';
import * as repositorioTarea from '../../repositories/tarea.repositorio.js';

export const ejecutar = async (identificador, datos) => {
  const tareaActual = await repositorioTarea.buscarPorId(identificador);
  if (!tareaActual) {
    return null;
  }
  const tarea = new Tarea({ ...tareaActual, ...datos });
  return repositorioTarea.actualizar(identificador, tarea);
};
