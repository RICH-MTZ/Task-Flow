import { Task } from '../entities/tarea.entidad.js'

const toDto = (doc) => {
  if (!doc) return null;
  const value = doc.toObject();
  value.id = String(value._id);
  delete value._id;
  delete value.__v;
  return value;
};

export const buscarTodas = async (filtros = {}) => await Task.find(filtros);

export const buscarPorId = async identificador => await Task.findById(identificador);


export const crear = async data => {
  const task = await Task.create(data);
  return toDto(task);
};

export const actualizar = async (identificador, datos) => {
  // Extraemos id y _id para que nunca se envíen dentro de $set
  const { id, _id, ...datosLimpios } = datos;

  const taskActualizada = await Task.findByIdAndUpdate(
    identificador,
    { $set: datosLimpios },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
  return toDto(taskActualizada);
};

export const eliminar = async (identificador) => {
  const taskEliminada = await Task.findByIdAndDelete(identificador);
  return Boolean(taskEliminada);
};
