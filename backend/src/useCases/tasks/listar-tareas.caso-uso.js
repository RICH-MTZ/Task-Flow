import * as repositorioTarea from '../../repositories/tarea.repositorio.js';

export const ejecutar = async filtros => await repositorioTarea.buscarTodas(filtros);
