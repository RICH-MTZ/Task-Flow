import * as actualizarTarea from '../useCases/tasks/actualizar-tarea.caso-uso.js';
import * as crearTarea from '../useCases/tasks/crear-tarea.caso-uso.js';
import * as eliminarTarea from '../useCases/tasks/eliminar-tarea.caso-uso.js';
import * as listarTareas from '../useCases/tasks/listar-tareas.caso-uso.js';
import * as obtenerTareaPorId from '../useCases/tasks/obtener-tarea-por-id.caso-uso.js';

export const listar = async (solicitud, respuesta, siguiente) => {
  try {
    const tareas = await listarTareas.ejecutar(solicitud.query);
    return respuesta.json(tareas);
  } catch (error) {
    siguiente(error);
  }
};

export const obtenerPorId = async (solicitud, respuesta, siguiente) => {
  try {
    const tarea = await obtenerTareaPorId.ejecutar(solicitud.params.id);
    if (!tarea) {
      return respuesta.status(404).json({ message: 'Tarea no encontrada' });
    }
    return respuesta.json(tarea);
  } catch (error) {
    siguiente(error);
  }
};

export const crear = async (solicitud, respuesta, siguiente) => {
  try {
    const tarea = await crearTarea.ejecutar(solicitud.body);
    return respuesta.status(201).json(tarea);
  } catch (error) {
    siguiente(error);
  }
};

export const actualizar = async (solicitud, respuesta, siguiente) => {
  try {
    const tarea = await actualizarTarea.ejecutar(solicitud.params.id, solicitud.body);
    if (!tarea) {
      return respuesta.status(404).json({ message: 'Tarea no encontrada' });
    }
    return respuesta.json(tarea);
  } catch (error) {
    siguiente(error);
  }
};

export const eliminar = async (solicitud, respuesta, siguiente) => {
  try {
    const eliminada = await eliminarTarea.ejecutar(solicitud.params.id);
    if (!eliminada) {
      return respuesta.status(404).json({ message: 'Tarea no encontrada' });
    }
    return respuesta.status(204).send();
  } catch (error) {
    siguiente(error);
  }
};
