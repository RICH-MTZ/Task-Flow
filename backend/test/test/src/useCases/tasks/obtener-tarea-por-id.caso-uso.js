import * as repositorioTarea from '../../repositories/tarea.repositorio.js';

export const ejecutar = async identificador => await repositorioTarea.buscarPorId(identificador);
