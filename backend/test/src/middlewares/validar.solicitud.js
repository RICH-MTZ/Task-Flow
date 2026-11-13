import { response as respuestaExpress } from 'express';
import { validationResult as resultadoValidacion } from 'express-validator';

export const validarSolicitud = (solicitud, respuesta = respuestaExpress, siguiente) => {
  const errores = resultadoValidacion(solicitud);
  if (!errores.isEmpty()) {
    const detalles = errores.array().map(({ location, msg, path, type }) => ({
      location,
      msg,
      path,
      type,
    }));
    return respuesta.status(400).json({ mensaje: 'Datos invalidos', errores: detalles });
  }
  siguiente();
};
