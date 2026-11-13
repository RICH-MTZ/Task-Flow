import * as repositorioTarea from '../../repositories/tarea.repositorio.js';

export const ejecutar = async (identificador, datos) => {
  const { id, _id, ...datosLimpios } = datos;
  return await repositorioTarea.actualizar(identificador, datosLimpios);
};