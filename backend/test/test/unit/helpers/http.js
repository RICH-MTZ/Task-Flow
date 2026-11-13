import { jest } from '@jest/globals';

export const crearRespuesta = () => {
  const respuesta = {
    json: jest.fn(),
    send: jest.fn(),
    status: jest.fn(),
  };
  respuesta.status.mockReturnValue(respuesta);
  respuesta.json.mockReturnValue(respuesta);
  respuesta.send.mockReturnValue(respuesta);
  return respuesta;
};

export const ejecutarMiddlewares = async (middlewares, solicitud, respuesta) => {
  for (const middleware of middlewares) {
    await new Promise((resolver, rechazar) => {
      middleware(solicitud, respuesta, error => error ? rechazar(error) : resolver());
    });
  }
};
