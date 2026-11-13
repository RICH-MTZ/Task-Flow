import * as repositorioTarea from '../../repositories/tarea.repositorio.js';

/**
 * Elimina una tarea.
 *
 * @param {Number} identificador
 * @returns {Boolean}
 */
export const ejecutar = async identificador => await repositorioTarea.eliminar(identificador);
