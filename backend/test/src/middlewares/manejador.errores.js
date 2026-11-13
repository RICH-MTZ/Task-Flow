const manejadorErrores = (error, _solicitud, respuesta, _siguiente) => {
  console.error(error.message);
  return respuesta.status(500).json({ mensaje : 'Error interno en el servidor' });
};

export default manejadorErrores;
