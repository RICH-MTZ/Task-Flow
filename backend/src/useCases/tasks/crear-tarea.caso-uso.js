import * as repositorioTarea from '../../repositories/tarea.repositorio.js';

export const ejecutar = async datos => {
  return await repositorioTarea.crear(datos);
};
